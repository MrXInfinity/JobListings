import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type themeT = {
  isThemeDark: boolean | null;
  toggle: () => void;
};

const useTheme = create(
  persist<themeT>(
    (set, get) => ({
      isThemeDark: false,
      toggle: () => set({ isThemeDark: !get().isThemeDark }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => window.localStorage),
    }
  )
);

export default useTheme;
