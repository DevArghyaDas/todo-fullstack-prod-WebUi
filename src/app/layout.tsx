import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/ThemeProvider";
import { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Header />

          <main className="mx-auto max-w-screen-lg px-6 py-2">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
