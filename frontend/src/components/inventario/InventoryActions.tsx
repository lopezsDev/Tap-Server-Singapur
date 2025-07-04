'use client';

import { PlusCircle, Search, Layers } from 'lucide-react';

interface Props {
    search: string;
    setSearch: (value: string) => void;
    onAdd: () => void;
    onManageCategories: () => void;
}

export default function InventoryActions({ search, setSearch, onAdd, onManageCategories }: Props) {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onAdd}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-white flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" /> Añadir producto
                </button>
                <button
                    onClick={onManageCategories}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full text-white flex items-center gap-2"
                >
                    <Layers className="w-5 h-5" /> Gestionar categorías
                </button>
            </div>

            <div className="flex items-center mb-4 gap-2">
                <div className="flex items-center bg-[#2a1b3d] rounded-lg p-2 flex-1">
                    <Search className="w-5 h-5 text-purple-300" />
                    <input
                        type="text"
                        placeholder="Buscar productos"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-white ml-2 w-full"
                    />
                </div>
            </div>
        </>
    );
}
