export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
}

export type Role = 'librarian' | 'member' | 'super-admin'

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User
    role: Role
    permissions: {
      user: {
        administer: boolean
        deleteSelf: boolean
      }
      book: {
        administer: boolean
        borrow: boolean
        view: boolean
      }
    }
  }
}
