import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "The blog",
  description: "Descrição da página",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <header>Header</header>
      <body
      >
        {children}
      </body>
      <footer>Footer</footer>
    </html>
  );
}
