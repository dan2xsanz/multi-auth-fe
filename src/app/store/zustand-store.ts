import { create } from 'zustand'

// LOADING STORE
type Store = {
  isLoading: boolean
  setIsLoading: (data: boolean) => void
}

export const useStore = create<Store>()((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))

// LOGIN STORE
type LogInStore = {
  isLogIn: boolean
  setIsLogIn: (data: boolean) => void
}

export const logInStore = create<LogInStore>()((set) => ({
  isLogIn: false,
  setIsLogIn: (login) => set({ isLogIn: login }),
}))

type AccountDetailStore = {
  accountId: number | undefined
  setAccountId: (accountId: number | undefined) => void
  firstName: string | undefined
  setFirstName: (firstName: string | undefined) => void
  lastName: string | undefined
  setLastName: (lastName: string | undefined) => void
  email: string | undefined
  setEmail: (email: string | undefined) => void
}

// ACCOUNT MASTER DETAIL STORE
const loadInitialState = (): Partial<AccountDetailStore> => {
  const storedState = localStorage.getItem('accountDetailStore')
  return storedState ? JSON.parse(storedState) : {}
}

export const accountDetailStore = create<AccountDetailStore>((set) => ({
  accountId: undefined,
  setAccountId: (accountId: number | undefined) =>
    set({ accountId: accountId }),
  firstName: undefined,
  setFirstName: (firstName: string | undefined) =>
    set({ firstName: firstName }),
  lastName: undefined,
  setLastName: (lastName: string | undefined) => set({ lastName: lastName }),
  email: undefined,
  setEmail: (email: string | undefined) => set({ email: email }),
}))

accountDetailStore.subscribe((state) => {
  localStorage.setItem('accountDetailStore', JSON.stringify(state))
})

accountDetailStore.setState(loadInitialState())
