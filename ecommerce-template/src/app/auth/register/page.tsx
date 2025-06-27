import { AuthLayout } from '@/components/layout/AuthLayout'
import { RegisterForm } from '@/components/forms/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}

export const metadata = {
  title: 'Criar Conta - ShopEasy',
  description: 'Crie sua conta ShopEasy para começar a vender produtos online',
}
