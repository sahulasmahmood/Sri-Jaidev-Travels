import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

import { ThemeProvider } from "@/components/providers/theme"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import { GoogleAuthProvider } from '@/components/providers/google-auth-provider'
import { SEOProvider } from '@/components/providers/seo-provider'
import { getThemeServer, hexToHsl } from "@/lib/get-theme-server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sri Jaidev Tours & Travels - Premium Travel Services in Tamil Nadu",
  description: "Experience Tamil Nadu with Sri Jaidev Tours & Travels. Premium travel services including tour packages, airport taxi, day rentals, and more.",
  keywords: "Tamil Nadu travel, tour packages, airport taxi, day rental, travel services, Sri Jaidev Travels",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch theme data server-side
  const themeData = await getThemeServer()
  
  // Generate CSS variables for server-side injection
  const themeStyles = `
    :root {
      --admin-primary: ${themeData.primaryColor};
      --admin-secondary: ${themeData.secondaryColor};
      --admin-gradient: linear-gradient(${themeData.gradientDirection}, ${themeData.primaryColor} 0%, ${themeData.secondaryColor} 100%);
      --admin-primary-hsl: ${hexToHsl(themeData.primaryColor)};
      --admin-secondary-hsl: ${hexToHsl(themeData.secondaryColor)};
      --sidebar-primary: ${hexToHsl(themeData.primaryColor)};
      --sidebar-ring: ${hexToHsl(themeData.primaryColor)};
    }
  `

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SEOProvider>
            <DynamicFavicon />
            <GoogleAuthProvider>
              {children}
            </GoogleAuthProvider>
          </SEOProvider>
        </ThemeProvider>
        <Toaster  />
      </body>
    </html>
  )
}
