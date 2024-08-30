import { AuthLayout } from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'

export default function Page() {
  return <>
  <AuthLayout>
    <LoginForm />
  </AuthLayout>
  </>
}
