import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="es">
      <body className="flex h-screen bg-[#1c1326] text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
          <main className="flex-1 p-8 overflow-auto">{children}</main>
          <Footer/>
      </div>
      </body>
      </html>
  );
}