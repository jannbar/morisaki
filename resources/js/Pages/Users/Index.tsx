import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Index({ auth, users }: PageProps) {
  return (
    <AuthenticatedLayout>
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
