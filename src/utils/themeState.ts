import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const { localStorage, matchMedia } = window

export type themeT = {
  isThemeDark: boolean,
  toggle: () => void
}

const useTheme = create(
  persist<themeT>(
    (set, get) => ({
      isThemeDark: localStorage.getItem("theme") ? localStorage.getItem("theme") === "dark" : matchMedia("(prefers-color-scheme: dark)").matches,
      toggle: () => set((state) => ({
        isThemeDark: !state.isThemeDark
      }))
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useTheme

