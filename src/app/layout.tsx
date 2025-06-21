import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import "./globals.css";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Vitor Forbrig",
  description: "Vitor Forbrig - Senior Frontend Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.page}>
        <Header />

        <main className={styles.main}>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
