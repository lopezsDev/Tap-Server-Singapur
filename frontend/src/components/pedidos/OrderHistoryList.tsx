'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

interface Product {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

interface Order {
    id: number;
    observations: string;
    orderDate: string;
    products: Product[];
}

interface Props {
    orders: Order[];
    onDelete: (id: number) => void;
}

export default function OrderHistoryList({ orders, onDelete }: Props) {
    if (orders.length === 0) {
        return <p className="text-zinc-400">No hay pedidos registrados aún.</p>;
    }

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border border-zinc-700 rounded-lg p-4 bg-[#2a1b3d]"
                >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">
                            Pedido #{order.id}
                        </h3>
                        <div className="flex gap-4 items-center">
              <span className="text-sm text-purple-300">
                {order.orderDate
                    ? format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm')
                    : 'Sin fecha'}
              </span>
                            <Link
                                href={`/pedidos/historial/${order.id}`}
                                className="text-purple-400 text-sm hover:underline"
                            >
                                Ver detalle
                            </Link>
                            <button
                                onClick={() => {
                                    if (confirm(`¿Eliminar el pedido #${order.id}?`)) {
                                        onDelete(order.id);
                                    }
                                }}
                                className="text-red-500 hover:text-red-600"
                                title="Eliminar pedido"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {order.observations && (
                        <p className="text-sm italic text-zinc-400 mb-3">
                            Observaciones: {order.observations}
                        </p>
                    )}

                    <table className="w-full text-sm text-white border-separate border-spacing-y-2">
                        <thead>
                        <tr className="text-purple-300">
                            <th className="text-left">Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-right">Precio</th>
                            <th className="text-right">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.products.map((p, i) => (
                            <tr key={i} className="bg-[#3a2b4f] rounded-lg">
                                <td className="px-2 py-1">{p.name}</td>
                                <td className="text-center">{p.quantity}</td>
                                <td className="text-right">₡{p.price.toLocaleString()}</td>
                                <td className="text-right">₡{p.subtotal.toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
