import "@/styles/globals.css";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="es">
      <body className="flex h-screen bg-[#1c1326] text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
      </body>
      </html>
  );
}