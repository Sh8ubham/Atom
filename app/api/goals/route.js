import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;
  const userId = cookieStore.get('atomquest_user_id')?.value;

  if (!role || !userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let query = supabase.from('goals').select('*');

  if (role === 'manager') {
    
    const { data: team } = await supabase.from('users').select('id').eq('manager_id', userId);
    const teamIds = team ? team.map(u => u.id) : [];
    query = query.in('employee_id', [userId, ...teamIds]);
  } else if (role === 'employee') {
    query = query.eq('employee_id', userId);
  }

  const { data: goals, error } = await query;
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (role === 'admin') {
    const { data: users } = await supabase.from('users').select('id, name');
    return NextResponse.json({ goals, users }, { status: 200 });
  }

  return NextResponse.json({ goals }, { status: 200 });
}

export async function POST(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;
  const userId = cookieStore.get('atomquest_user_id')?.value;

  if (!role || !userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, thrust_area, uom_type, target, deadline, weightage } = body;

    if (!title || !thrust_area || !uom_type || !weightage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (weightage < 10) {
      return NextResponse.json({ error: 'Each goal must have a minimum of 10% weightage' }, { status: 400 });
    }

    const { data: userGoals, error: fetchError } = await supabase
      .from('goals')
      .select('weightage')
      .eq('employee_id', userId);
      
    if (fetchError) throw fetchError;
    
    if (userGoals.length >= 8) {
      return NextResponse.json({ error: 'Maximum 8 goals per user allowed' }, { status: 400 });
    }

    const currentTotalWeightage = userGoals.reduce((sum, g) => sum + Number(g.weightage), 0);
    if (currentTotalWeightage + Number(weightage) > 100) {
      return NextResponse.json({ error: `Total weightage cannot exceed 100%. Current total: ${currentTotalWeightage}%` }, { status: 400 });
    }

    const newGoal = {
      id: `g-${Date.now()}`,
      employee_id: userId,
      title,
      thrust_area,
      uom_type,
      target: target || null,
      actual: null,
      deadline: deadline || null,
      weightage: Number(weightage),
      status: 'pending',
      locked_at: null
    };

    const { data: goal, error: insertError } = await supabase
      .from('goals')
      .insert(newGoal)
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}
