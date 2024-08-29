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

export const enviromentURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_METADATA_BASE
    : process.env.NEXT_PUBLIC_METADATA_BASE_PRO;

export const metadata: Metadata = {
  metadataBase: new URL(`${enviromentURL}`),
  title: "Your perspective",
  description: "Discover untold stories and whispered tales on our channel",
  keywords: [
    "your-perspective",
    "Your perspective",
    "Blog content",
    "Your perspective blog",
  ],
  bookmarks: enviromentURL,
  verification: { google: "AFGzcKWfUIi-_4W7o5IX47AlGs9xGjXmgyi1Q_HXQ7o" },
  openGraph: {
    type: "website",
    url: enviromentURL,
    title: "your-perspective",
    description: "Discover untold stories and whispered tales on our channel",
    siteName: "your-perspective",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "your perspective",
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
        <link rel="canonical" href={enviromentURL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              <Toaster richColors />
              <AlertCompo
                url="#"
                link_label="Contact!"
                title="Contact us to advertisment"
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
