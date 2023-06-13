"use client";

import useTheme from "@/utils/themeState";
import useStore from "@/utils/useStore";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isThemeDark = useStore(useTheme, (state) => state.isThemeDark);

  return (
    <div
      className={`${
        isThemeDark ? "dark" : ""
      } flex h-screen w-screen flex-col `}
    >
      {children}
    </div>
  );
}
