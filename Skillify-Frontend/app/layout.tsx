import "./globals.css";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Skillify",
  description: "Skillify is a platform to learn and share knowledge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
