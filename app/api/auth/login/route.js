import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginUser } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await loginUser(email, password, role);

    const cookieStore = await cookies();
    cookieStore.set('atomquest_role', user.role, { httpOnly: true, path: '/' });
    cookieStore.set('atomquest_user_id', user.id, { httpOnly: true, path: '/' });
    cookieStore.set('atomquest_name', encodeURIComponent(user.name), { httpOnly: false, path: '/' });

    
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
