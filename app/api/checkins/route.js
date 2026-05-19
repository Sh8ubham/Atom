import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { calcScore } from '@/lib/scoreCalc';

export async function POST(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;
  const userId = cookieStore.get('atomquest_user_id')?.value;

  if (!role || !userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { goal_id, actual_value } = body;

    if (!goal_id || actual_value === undefined) {
      return NextResponse.json({ error: 'goal_id and actual_value are required' }, { status: 400 });
    }

    const { data: goal, error: goalError } = await supabase
      .from('goals')
      .select('*')
      .eq('id', goal_id)
      .single();

    if (goalError || !goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    if (goal.employee_id !== userId && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!goal.locked_at) {
      return NextResponse.json({ error: 'Cannot check-in. Goal is not approved/locked yet.' }, { status: 400 });
    }

    const submittedDate = new Date().toISOString();
    const score = calcScore(goal.uom_type, goal.target, actual_value, goal.deadline, submittedDate);

    const { error: updateError } = await supabase
      .from('goals')
      .update({ actual: actual_value })
      .eq('id', goal_id);

    if (updateError) throw updateError;

    const newCheckin = {
      id: `c-${Date.now()}`,
      goal_id,
      employee_id: goal.employee_id,
      actual_value: Number(actual_value),
      score,
      timestamp: submittedDate
    };

    const { error: checkinError } = await supabase
      .from('checkins')
      .insert(newCheckin);
      
    if (checkinError) throw checkinError;

    await supabase.from('audit_log').insert({
      id: `a-${Date.now()}`,
      entity_type: 'checkin',
      entity_id: newCheckin.id,
      action: 'CHECKED_IN',
      changed_by: userId,
      details: `Updated actual to ${actual_value}, new score: ${score}`,
      timestamp: submittedDate
    });

    return NextResponse.json({ checkin: newCheckin, goal: { ...goal, actual: actual_value } }, { status: 201 });
  } catch(error) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}

export async function GET(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data: checkins, error } = await supabase
    .from('checkins')
    .select('*')
    .order('timestamp', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ checkins }, { status: 200 });
}
