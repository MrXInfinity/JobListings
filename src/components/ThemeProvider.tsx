"use client";

import useTheme from "@/utils/themeState";
import { useEffect } from "react";
import useStore from "@/utils/useStore";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isThemeDark = useStore(useTheme, (state) => state.isThemeDark);

  return <div className={`${isThemeDark ? "dark" : ""}`}>{children}</div>;
}
