'use client';

import { Beer, Utensils } from 'lucide-react';

export default function DashboardEntry() {
    return (
        <section className="flex flex-col items-center justify-center h-full text-center gap-8 text-white">
            <h1 className="text-4xl font-bold">Bienvenido al Sistema de Gestión</h1>
            <p className="text-lg text-zinc-400 max-w-xl">
                Administra tu inventario, gestiona ventas y consulta información general del bar de forma eficiente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                <div className="bg-[#2a1b3d] p-6 rounded-lg flex flex-col items-center transition">
                    <Beer className="w-10 h-10 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold">Inventario</h3>
                    <p className="text-sm text-zinc-400 mt-2">Revisa, edita y controla el stock de productos.</p>
                </div>
                <div className="bg-[#2a1b3d] p-6 rounded-lg flex flex-col items-center transition">
                    <Utensils className="w-10 h-10 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold">Ventas</h3>
                    <p className="text-sm text-zinc-400 mt-2">Registra ventas fácilmente y mantén el control.</p>
                </div>
            </div>
        </section>
    );
}
