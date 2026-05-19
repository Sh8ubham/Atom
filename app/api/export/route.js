import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;

  if (!role) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  
  const { data: goals, error: goalsError } = await supabase.from('goals').select('*');
  const { data: users, error: usersError } = await supabase.from('users').select('*');
  const { data: checkins, error: checkinsError } = await supabase.from('checkins').select('*').order('timestamp', { ascending: false });

  if (goalsError || usersError || checkinsError) {
    return NextResponse.json({ error: 'Failed to fetch export data' }, { status: 500 });
  }

  const headers = [
    'Employee', 'Manager', 'Goal Title', 'Thrust Area', 'UoM Type', 'Target', 
    'Q1 Actual', 'Q1 Score', 'Q2 Actual', 'Q2 Score', 'Q3 Actual', 'Q3 Score', 'Q4 Actual', 'Q4 Score'
  ];

  let csvContent = headers.join(',') + '\n';

  for (const goal of goals) {
    const employee = users.find(u => u.id === goal.employee_id);
    const manager = employee ? users.find(u => u.id === employee.manager_id) : null;
    
    const empName = employee ? employee.name : 'Unknown';
    const mgrName = manager ? manager.name : 'None';
    
    
    const goalCheckins = checkins.filter(c => c.goal_id === goal.id);
    const latestCheckin = goalCheckins[0];
    
    const q1Actual = latestCheckin ? latestCheckin.actual_value : '';
    const q1Score = latestCheckin ? latestCheckin.score : '';
    
    const row = [
      `"${empName}"`,
      `"${mgrName}"`,
      `"${goal.title}"`,
      `"${goal.thrust_area}"`,
      `"${goal.uom_type}"`,
      `"${goal.target || goal.deadline || ''}"`,
      `"${q1Actual}"`,
      `"${q1Score}"`,
      `""`, `""`, `""`, `""`, `""`, `""`
    ];
    
    csvContent += row.join(',') + '\n';
  }

  const response = new NextResponse(csvContent);
  response.headers.set('Content-Type', 'text/csv');
  response.headers.set('Content-Disposition', 'attachment; filename="atomquest_goals_export.csv"');

  return response;
}
