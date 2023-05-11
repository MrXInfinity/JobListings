"use client";

import useTheme from "@/utils/themeState";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isThemeDark = useTheme((state) => state.isThemeDark);

  if (isThemeDark) return <div className="dark">{children}</div>;
  return <div className={``}>{children}</div>;
}
