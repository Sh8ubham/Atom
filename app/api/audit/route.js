import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const cookieStore = await cookies();
  const role = cookieStore.get('atomquest_role')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden. Admin only.' }, { status: 403 });
  }

  const { data: auditLog, error } = await supabase
    .from('audit_log')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: users } = await supabase.from('users').select('id, name, role');

  return NextResponse.json({ auditLog, users }, { status: 200 });
}
