import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Latest Releases",
  description: "Latest releases of Onset projects",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
