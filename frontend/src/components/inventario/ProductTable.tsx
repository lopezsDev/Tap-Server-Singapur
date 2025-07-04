'use client';

import { Pencil, Trash2, FileCog } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    availableQuantity: number;
    criticalQuantity: number;
}

interface Props {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
    onWithdraw: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onWithdraw }: Props) {
    const getAlertLevel = (product: Product) =>
        product.availableQuantity <= product.criticalQuantity ? 'Bajo' : 'Normal';

    if (products.length === 0) {
        return (
            <p className="text-center text-gray-400 mt-4">No hay productos para mostrar.</p>
        );
    }

    return (
        <table className="w-full border-separate border-spacing-y-2">
            <thead>
            <tr>
                <th className="text-left">Nombre</th>
                <th className="text-left">Categoría</th>
                <th className="text-left">Precio</th>
                <th className="text-left">Stock</th>
                <th className="text-left">Alerta</th>
                <th className="text-left">Acción</th>
            </tr>
            </thead>
            <tbody>
            {products.map((p) => (
                <tr key={p.id} className="bg-[#2a1b3d] rounded-lg">
                    <td className="py-2 px-4">{p.name}</td>
                    <td>{p.category}</td>
                    <td>₡ {p.price}</td>
                    <td>{p.availableQuantity}</td>
                    <td>
                            <span
                                className={`px-4 py-1 rounded-full ${
                                    getAlertLevel(p) === 'Bajo'
                                        ? 'bg-red-500'
                                        : 'bg-purple-700'
                                }`}
                            >
                                {getAlertLevel(p)}
                            </span>
                    </td>
                    <td>
                        <div className="flex gap-2">
                            <button onClick={() => onEdit(p)}>
                                <Pencil className="text-purple-300 w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(p.id)}>
                                <Trash2 className="text-red-400 w-4 h-4" />
                            </button>
                            <button onClick={() => onWithdraw(p)}>
                                <FileCog className="text-blue-500 w-4 h-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}