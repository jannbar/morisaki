import { PageProps } from '@/types'
import { usePermissions } from '@/util/usePermissions'
import { ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { UsersIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'

type Action = {
  icon: JSX.Element
  title: string
  help: string
  link: string
  gate: {
    permission:
      | keyof PageProps['auth']['permissions']['user']
      | keyof PageProps['auth']['permissions']['book']
    resource: keyof PageProps['auth']['permissions']
  }
}

const actions: Action[] = [
  {
    icon: <UsersIcon className="mr-2 size-5" />,
    title: 'Administer Members',
    help: 'Create new members or update existing members data.',
    link: '#',
    gate: {
      permission: 'administerMembers',
      resource: 'user',
    },
  },
  {
    icon: <BookOpenIcon className="mr-2 size-5" />,
    title: 'Administer Books',
    help: 'Create new books or edit existing books data.',
    link: '#',
    gate: {
      permission: 'administer',
      resource: 'book',
    },
  },
]

export default function DashboardActions() {
  const { can, permissions } = usePermissions()

  return (
    <div className="mt-4 grid grid-cols-3 gap-8">
      {actions.map((action, i) =>
        can(
          action.gate
            .permission as keyof (typeof permissions)[typeof action.gate.resource],
          permissions[action.gate.resource],
        ) ? (
          <Link
            key={i}
            href={action.link}
            className="group rounded-lg p-6 ring-2 ring-stone-200 hover:ring-stone-300"
          >
            <div className="flex items-center">
              {action.icon}
              <p className="font-medium">{action.title}</p>
            </div>
            <p className="mt-3 text-pretty text-sm font-normal leading-relaxed text-stone-500">
              {action.help}
            </p>
            <div className="mt-3 flex justify-end">
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ) : null,
      )}
    </div>
  )
}
