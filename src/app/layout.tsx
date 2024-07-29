import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import AlertCompo from "@/components/Alert/AlertCompo";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-eval' 'unsafe-inline'"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <StoreProvider>
          <Suspense fallback={<Loading />}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Navbar />
              <AlertCompo
                url="#"
                link_label="Contact!"
                title="Contact us to advertisment"
                variant={"info"}
              />
              {children}
            </ThemeProvider>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
