import { createContext, useContext } from 'react'
import { AuthUser } from 'interfaces/AuthUser'

interface Ctx {
  authUser: AuthUser | null
}

export const AppContext = createContext<Ctx>(null)

export const useAppContext = () => {
  const { authUser } = useContext(AppContext)
  return { authUser }
}
