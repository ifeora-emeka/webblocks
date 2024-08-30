
import { AuthLayout } from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  const cookie = cookies();
  let token = cookie.get('token')?.value;

  if (token) {
    return redirect(`/dashboard/workspace/1234`)
  }
  return <>
  <AuthLayout>
    <LoginForm />
  </AuthLayout>
  </>
}

