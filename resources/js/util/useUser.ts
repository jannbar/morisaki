import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

export function useUser() {
  const user = usePage<PageProps>().props.auth.user

  return {
    user,
  }
}
