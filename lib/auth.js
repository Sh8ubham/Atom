import { supabase } from './supabase';

export async function loginUser(email, password, role) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .eq('role', role)
    .single();

  if (error || !data) {
    throw new Error('Invalid credentials or role');
  }
  return data;
}

export function getRoleFromCookie(cookieStore) {
  const roleCookie = cookieStore.get('atomquest_role');
  return roleCookie ? roleCookie.value : null;
}

export function requireRole(cookieStore, allowedRoles) {
  const role = getRoleFromCookie(cookieStore);
  if (!role || !allowedRoles.includes(role)) {
    throw new Error('Unauthorized');
  }
  return role;
}
