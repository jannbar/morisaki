import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import Actions from './partials/Actions'

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <h1 className="text-xl font-bold tracking-tight">
        Welcome back, {auth.user.name}
      </h1>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Actions</h2>

        <Actions />
      </section>
    </AuthenticatedLayout>
  )
}
