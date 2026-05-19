import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;
  const adminId = cookieStore.get('atomquest_user_id')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden. Admin only.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { assigned_to, title, thrust_area, uom_type, target, deadline, weightage } = body;

    if (!assigned_to || !Array.isArray(assigned_to) || assigned_to.length === 0) {
      return NextResponse.json({ error: 'assigned_to must be a non-empty array of employee IDs' }, { status: 400 });
    }

    if (!title || !thrust_area || !uom_type || !weightage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const createdGoals = [];
    const auditLogs = [];

    for (const employeeId of assigned_to) {
      const newGoal = {
        id: `g-shared-${Date.now()}-${employeeId}`,
        employee_id: employeeId,
        title,
        thrust_area,
        uom_type,
        target: target || null,
        actual: null,
        deadline: deadline || null,
        weightage: Number(weightage),
        status: 'approved',
        locked_at: new Date().toISOString()
      };
      createdGoals.push(newGoal);

      auditLogs.push({
        id: `a-${Date.now()}-${employeeId}`,
        entity_type: 'goal',
        entity_id: newGoal.id,
        action: 'SHARED_CREATED',
        changed_by: adminId,
        timestamp: new Date().toISOString()
      });
    }

    const { error: insertError } = await supabase.from('goals').insert(createdGoals);
    if (insertError) throw insertError;

    await supabase.from('audit_log').insert(auditLogs);

    return NextResponse.json({ goals: createdGoals, message: `Created ${createdGoals.length} shared goals.` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}
