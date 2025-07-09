import type { Metadata } from "next";

import { ThemeProvider } from "@/context/ThemeProvider";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrixBackground";

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
  openGraph: {
    title: "Vitor Forbrig – Senior Frontend Engineer & TypeScript Specialist",
    description: description,
    url: "https://forbrig.github.io/",
    siteName: "Vitor Forbrig - Portfolio",
    images: [
      {
        url: "/cartoon-profile.png",
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
          <MatrixBackground />

          <Header />

          <main className={styles.main}>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
