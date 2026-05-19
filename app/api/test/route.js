import { loginUser } from '@/lib/auth';
import { calcScore } from '@/lib/scoreCalc';

export async function GET() {
  const origin = 'http://localhost:3000';
  
  const report = {
    login: false,
    goalValidation: false,
    goalApproval: false,
    scoreCalculation: false,
    csvExport: false
  };

  try {
    
    
    
    let loginPassed = false;
    try {
      const emp = loginUser('emp1@atomquest.com', 'password123', 'employee');
      const mgr = loginUser('manager1@atomquest.com', 'password123', 'manager');
      const adm = loginUser('admin@atomquest.com', 'password123', 'admin');
      if (emp && mgr && adm) loginPassed = true;
    } catch(e) {
      console.error("Login test failed:", e);
    }
    report.login = loginPassed;

    
    
    
    let createdGoalId = null;
    try {
      
      const validGoalRes = await fetch(`${origin}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'atomquest_role=employee; atomquest_user_id=emp-1'
        },
        body: JSON.stringify({
          title: 'Test Goal for Harness',
          thrust_area: 'Test',
          uom_type: 'Maximize',
          weightage: 10,
          target: 100
        })
      });
      if (validGoalRes.status === 201) {
        const body = await validGoalRes.json();
        createdGoalId = body.goal.id;
      }

      
      const goalRes = await fetch(`${origin}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'atomquest_role=employee; atomquest_user_id=emp-1'
        },
        body: JSON.stringify({
          title: 'Break Limit',
          thrust_area: 'Test',
          uom_type: 'Maximize',
          weightage: 101 
        })
      });
      
      if (goalRes.status === 400 && createdGoalId) {
        report.goalValidation = true;
      }
    } catch(e) {
      console.error("Goal validation test failed:", e);
    }

    
    
    
    try {
      if (createdGoalId) {
        const approveRes = await fetch(`${origin}/api/goals/${createdGoalId}/approve`, {
          method: 'POST',
          headers: {
            'Cookie': 'atomquest_role=manager; atomquest_user_id=mgr-1'
          }
        });
        if (approveRes.status === 200) {
          report.goalApproval = true;
        }
      }
    } catch(e) {
      console.error("Goal approval test failed:", e);
    }

    
    
    
    try {
      let calcPassed = false;
      const score = calcScore('Maximize', 100, 80, null, null);
      const scoreCalcPassed = score === 80;

      if (scoreCalcPassed && createdGoalId) {
        
        const checkinRes = await fetch(`${origin}/api/checkins`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': 'atomquest_role=employee; atomquest_user_id=emp-1'
          },
          body: JSON.stringify({
            goal_id: createdGoalId,
            actual_value: 80
          })
        });
        if (checkinRes.status === 201) {
          calcPassed = true;
        }
      }
      report.scoreCalculation = calcPassed;
    } catch(e) {
      console.error("Score calculation test failed:", e);
    }

    
    
    
    try {
      const exportRes = await fetch(`${origin}/api/export`, {
        headers: {
          'Cookie': 'atomquest_role=admin; atomquest_user_id=admin-1'
        }
      });
      const contentType = exportRes.headers.get('content-type');
      if (exportRes.status === 200 && contentType?.includes('text/csv')) {
        report.csvExport = true;
      }
    } catch(e) {
      console.error("CSV Export test failed:", e);
    }

    const allPassed = Object.values(report).every(v => v === true);

    return Response.json({
      status: allPassed ? 'ALL TESTS PASSED 🎉' : 'SOME TESTS FAILED ❌',
      report
    });

  } catch (error) {
    return Response.json({
      status: 'TEST HARNESS ERROR',
      error: error.message,
      report
    }, { status: 500 });
  }
}
