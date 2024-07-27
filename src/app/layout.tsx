import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import AlertCompo from "@/components/Alert/AlertCompo";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your perspective",
  description: "Discover untold stories and whispered tales on our channel",
  openGraph: {
    title: "Your perspective",
    description: "Discover untold stories and whispered tales on our channel",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "website",
  name: "Your perspective",
  description: "Discover untold stories and whispered tales on our channel",
  url: "http://localhost:3000",
  publisher: {
    "@type": "Organization",
    name: "Your perspective",
    logo: {
      "@type": "ImageObject",
      url: "", // Replace with your logo URL
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          roboto.style
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
