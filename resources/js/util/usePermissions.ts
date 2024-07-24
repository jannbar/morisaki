import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

type Authorizable = Record<string, boolean>

export function usePermissions() {
  const permissions = usePage<PageProps>().props.auth.permissions

  function can<T extends Authorizable>(
    ability: keyof T,
    authorizable: T,
  ): boolean {
    return authorizable[ability]
  }

  return {
    can,
    permissions,
  }
}
