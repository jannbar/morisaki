import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function BooksIndex({ auth, books }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Books
        </h2>
      }
    >
      <Head title="Books" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <pre>{JSON.stringify(books, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
