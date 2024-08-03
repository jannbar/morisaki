import ApplicationLogo from '@/Components/ApplicationLogo'
import { classNames } from '@/util/classNames'
import { roleEmojis } from '@/util/roleEmoji'
import { usePermissions } from '@/util/usePermissions'
import { useUser } from '@/util/useUser'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  ArrowPathRoundedSquareIcon,
  Bars3Icon,
  BookOpenIcon,
  HandRaisedIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'
import { PropsWithChildren, useState } from 'react'

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useUser()
  const { can, role, permissions } = usePermissions()

  const navigation = [
    {
      name: 'My Library',
      href: route('dashboard'),
      icon: HomeIcon,
      current: route().current('dashboard'),
    },
    {
      name: 'Members',
      href: '#',
      icon: UsersIcon,
      current: false,
      visible: can('administerMembers', permissions.user),
    },
    { name: 'Books', href: '#', icon: BookOpenIcon, current: false },
    {
      name: 'Loans',
      href: '#',
      icon: ArrowPathRoundedSquareIcon,
      current: false,
      visible: can('borrow', permissions.book),
    },
  ]
  const navigationForUser = navigation.filter((item) => item.visible ?? true)

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0',
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                            >
                              <span
                                className={classNames(
                                  team.current
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-20 shrink-0 items-center">
              <Link
                href={route('dashboard')}
                className="flex items-center space-x-2 text-red-500"
              >
                <ApplicationLogo className="block h-8 w-auto fill-current" />
                <span className="font-semibold">morisaki</span>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigationForUser.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-stone-50 text-stone-600'
                              : 'text-stone-700 hover:bg-stone-50 hover:text-stone-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? 'text-stone-600'
                                : 'text-stone-400 group-hover:text-stone-600',
                              'h-6 w-6 shrink-0',
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-stone-400">
                    Actions
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    <li>
                      <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-stone-700 hover:bg-rose-50 hover:text-rose-800"
                      >
                        <HandRaisedIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-stone-400 group-hover:text-rose-800"
                        />
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <Link
                    href={route('profile.edit')}
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-stone-900 hover:bg-stone-50"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-stone-100">
                      {roleEmojis[role]}
                    </span>
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{user.name}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-stone-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full bg-gray-50"
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="max-w-screen-2xl overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6 md:p-8 lg:p-10">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
