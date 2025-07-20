import type { Metadata } from "next";

import { ThemeProvider } from "@/context/ThemeProvider";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemedBackground } from "@/components/themedBackground";
import { ThemeControls } from "@/components/themedBackground/components/themeControls";

import "./globals.scss";
import styles from "./layout.module.scss";

const description =
  "Vitor Forbrig is a Senior Frontend Engineer specializing in React, TypeScript, and modern web technologies. Explore his portfolio and projects.";

export const metadata: Metadata = {
  title: "Vitor Forbrig – Senior Frontend Engineer & TypeScript Specialist",
  description: description,
  icons: {
    icon: "/cartoon-profile.png",
  },
  keywords: [
    "Vitor Forbrig",
    "Frontend Engineer",
    "TypeScript Specialist",
    "React Developer",
    "Web Development",
    "Portfolio",
  ],
  authors: [
    {
      name: "Vitor Forbrig",
      url: "https://forbrig.github.io/",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vitor Forbrig – Senior Frontend Engineer & TypeScript Specialist",
    description: description,
    url: "https://forbrig.github.io/",
    siteName: "Vitor Forbrig - Portfolio",
    images: [
      {
        url: "https://forbrig.github.io/cartoon-profile.png", // needs to be absolute URL
        width: 1200,
        height: 630,
        alt: "Vitor Forbrig Cartoon Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  other: {
    "google-site-verification": "PBsFeMdlBNvFg7Ydt98xQBcbCBF6ms5zWQcfXtTI2sk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.page}>
        <ThemeProvider>
          <ThemedBackground />
          <ThemeControls />

          <Header />

          <main className={styles.main}>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
