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

/**
 * LOGIN STORE
 */
type LogInStore = {
  isLogIn: boolean
  setIsLogIn: (data: boolean) => void
  resetLoginState: () => void
}

const loadInitialLoginState = (): Partial<LogInStore> => {
  const storedState = localStorage.getItem('logInStore')
  return storedState ? JSON.parse(storedState) : {}
}

export const logInStore = create<LogInStore>()((set) => ({
  isLogIn: false,
  setIsLogIn: (login) => set({ isLogIn: login }),
  resetLoginState: () =>
    set({
      isLogIn: false,
    }),
}))

logInStore.subscribe((state) => {
  localStorage.setItem('logInStore', JSON.stringify(state))
})

logInStore.setState(loadInitialLoginState())

/**
 * ACCOUNT DETAIL STORE
 */
type AccountDetailStore = {
  accountId: number | undefined
  setAccountId: (accountId: number | undefined) => void
  firstName: string | undefined
  setFirstName: (firstName: string | undefined) => void
  lastName: string | undefined
  setLastName: (lastName: string | undefined) => void
  email: string | undefined
  setEmail: (email: string | undefined) => void
  resetAccountDetailsState: () => void
}

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
  resetAccountDetailsState: () =>
    set({
      accountId: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    }),
}))

accountDetailStore.subscribe((state) => {
  localStorage.setItem('accountDetailStore', JSON.stringify(state))
})

accountDetailStore.setState(loadInitialState())
