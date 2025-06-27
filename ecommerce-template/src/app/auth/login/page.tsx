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
  title: 'Login - ShopEasy',
  description:
    'Entre na sua conta ShopEasy para acessar sua loja e gerenciar produtos',
}
