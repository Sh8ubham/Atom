import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(request, { params }) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;
  const managerId = cookieStore.get('atomquest_user_id')?.value;

  if (role !== 'manager' && role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  
  try {
    const body = await request.json();
    const { return_reason } = body;

    if (!return_reason) {
      return NextResponse.json({ error: 'return_reason is required' }, { status: 400 });
    }

    const { data: goal, error: fetchError } = await supabase
      .from('goals')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    if (role === 'manager') {
      const { data: employee, error: empError } = await supabase
        .from('users')
        .select('manager_id')
        .eq('id', goal.employee_id)
        .single();
        
      if (empError || !employee || employee.manager_id !== managerId) {
        return NextResponse.json({ error: 'Forbidden. Not the manager for this employee.' }, { status: 403 });
      }
    }

    const { data: updatedGoal, error: updateError } = await supabase
      .from('goals')
      .update({ 
        status: 'returned', 
        return_reason,
        locked_at: null 
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    await supabase.from('audit_log').insert({
      id: `a-${Date.now()}`,
      entity_type: 'goal',
      entity_id: goal.id,
      action: 'RETURNED',
      changed_by: managerId,
      details: return_reason,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ goal: updatedGoal }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}
