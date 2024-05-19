import { create } from 'zustand'

type Store = {
  isLoading: boolean
  setIsLoading: (data: boolean) => void
}

export const useStore = create<Store>()((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
