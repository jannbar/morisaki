import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Dashboard({ auth }: PageProps) {
  console.log({ auth })

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <h1 className="text-xl font-bold tracking-tight">
        Welcome back, {auth.user.name}
      </h1>
    </AuthenticatedLayout>
  )
}
