import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

type Authorizable = Record<string, boolean>

export function usePermissions() {
  const auth = usePage<PageProps>().props.auth
  const permissions = auth.permissions
  const role = auth.role

  function can<T extends Authorizable>(
    ability: keyof T,
    authorizable: T,
  ): boolean {
    return authorizable[ability]
  }

  return {
    can,
    permissions,
    role,
  }
}
