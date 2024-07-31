import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import BookCover from '@/Components/BookCover'

export default function BooksIndex({ books }: PageProps<{ books: any[] }>) {
  return (
    <AuthenticatedLayout>
      <Head title="Books" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="grid grid-cols-5 gap-12 p-6">
              {books.map((book) => (
                <BookCover key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
