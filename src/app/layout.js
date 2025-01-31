import { Roboto } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Fast Food",
  description: "Food Order & Delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main>
          <AppProvider>
            <Toaster />
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
