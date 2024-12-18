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
  token: string
  isLogIn: boolean
  refreshToken: string
  setToken: (data: string) => void
  setIsLogIn: (data: boolean) => void
  setRefreshToken: (data: string) => void
  resetLoginState: () => void
}

const loadInitialLoginState = (): Partial<LogInStore> => {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('logInStore')
    return storedState ? JSON.parse(storedState) : {}
  }
  return {} // return empty object on the server
}

export const logInStore = create<LogInStore>()((set) => ({
  isLogIn: false,
  token: '',
  refreshToken: '',
  setToken: (token) => set({ token: token }),
  setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
  setIsLogIn: (login) => set({ isLogIn: login }),
  resetLoginState: () =>
    set({
      isLogIn: false,
      token: '',
      refreshToken: '',
    }),
}))

// Subscribe to store and update localStorage (only in client-side)
if (typeof window !== 'undefined') {
  logInStore.subscribe((state) => {
    localStorage.setItem('logInStore', JSON.stringify(state))
  })
}

// Initialize store state (only in client-side)
if (typeof window !== 'undefined') {
  logInStore.setState(loadInitialLoginState())
}

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
  coverImg: string | undefined
  setCoverImg: (coverImg: string | undefined) => void
  profileImg: string | undefined
  setProfileImg: (coverImg: string | undefined) => void
  resetAccountDetailsState: () => void
}

const loadInitialState = (): Partial<AccountDetailStore> => {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('accountDetailStore')
    return storedState ? JSON.parse(storedState) : {}
  }
  return {} // return empty object on the server
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
  coverImg: undefined,
  setCoverImg: (coverImg: string | undefined) => set({ coverImg: coverImg }),
  profileImg: undefined,
  setProfileImg: (profileImg: string | undefined) =>
    set({ profileImg: profileImg }),
  resetAccountDetailsState: () =>
    set({
      accountId: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    }),
}))

// Subscribe to store and update localStorage (only in client-side)
if (typeof window !== 'undefined') {
  accountDetailStore.subscribe((state) => {
    localStorage.setItem('accountDetailStore', JSON.stringify(state))
  })
}

// Initialize store state (only in client-side)
if (typeof window !== 'undefined') {
  accountDetailStore.setState(loadInitialState())
}
