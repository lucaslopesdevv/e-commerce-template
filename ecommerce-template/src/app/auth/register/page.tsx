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
  title: 'Criar Conta - RentShop',
  description: 'Crie sua conta RentShop para alugar ou disponibilizar produtos',
}
