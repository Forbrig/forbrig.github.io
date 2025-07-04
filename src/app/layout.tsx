import type { Metadata } from "next";

import { ThemeProvider } from "@/context/ThemeProvider";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrixBackground";

import "./globals.scss";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Vitor Forbrig",
  description: "Vitor Forbrig - Senior Frontend Engineer",
  icons: {
    icon: "/cartoon-profile.png",
  }
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
