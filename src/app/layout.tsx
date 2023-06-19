import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Listings",
  description:
    "Job Listings help you store and edit your job listings in an organize way.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            <div className="flex flex-1 justify-stretch">{children}</div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
