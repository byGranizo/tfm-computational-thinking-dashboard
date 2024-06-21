import { useUserStore } from '@/store/user'

export const useUser = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const logout = useUserStore((state) => state.logout)

  const isLogged = user !== null

  return {
    user,
    setUser,
    logout,
    isLogged,
  }
}
