import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import AlertCompo from "@/components/Alert/AlertCompo";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Your perspective",
  description: "Discover untold stories and whispered tales on our channel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreProvider>
          <Suspense fallback={<Loading />}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AlertCompo
                title="Hello!"
                variant={"info"}
              />
              <Navbar />
              {children}
            </ThemeProvider>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
