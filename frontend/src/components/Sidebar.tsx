import { Home, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="w-60 bg-[#2a1b3d] p-4 flex flex-col gap-6">
            <Link href="/">
                <h1 className="text-lg font-semibold">Singapur Bar</h1>
            </Link>
            <nav className="flex flex-col gap-2">
                <Link href="/inventario" className="flex items-center gap-2 p-2 rounded-full hover:bg-[#3a2a55]">
                    <Home className="w-5 h-5" /> Inventario
                </Link>
                <Link href="/ventas" className="flex items-center gap-2 p-2 rounded-full hover:bg-[#3a2a55]">
                    <ShoppingCart className="w-5 h-5" /> Ventas
                </Link>
            </nav>
        </aside>
    );
}