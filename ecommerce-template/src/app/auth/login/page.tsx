import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/components/forms/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export const metadata = {
  title: 'Login - RentShop',
  description: 'Entre na sua conta RentShop para acessar produtos de aluguel',
}
