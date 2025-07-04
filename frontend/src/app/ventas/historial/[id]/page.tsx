'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchOrderById } from '@/lib/api';
import { format } from 'date-fns';

interface Product {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

interface Order {
    observations: string;
    OrderDate: string;
    products: Product[];
}

export default function OrderDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const res = await fetchOrderById(Number(id));
                setOrder(res.data);
            } catch {
                setError('No se pudo cargar el pedido.');
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [id]);

    if (loading) return <p className="p-6 text-zinc-400">Cargando...</p>;
    if (error || !order) return <p className="p-6 text-red-500">{error || 'Pedido no encontrado'}</p>;

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Detalle del Pedido #{id}</h1>

            <p className="text-sm text-purple-300 mb-2">
                {order.OrderDate
                    ? format(new Date(order.OrderDate), 'dd/MM/yyyy HH:mm')
                    : 'Sin fecha'}
            </p>

            {order.observations && (
                <p className="italic text-zinc-400 mb-4">
                    Observaciones: {order.observations}
                </p>
            )}

            <table className="w-full border-separate border-spacing-y-2 text-sm">
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

            <button
                onClick={() => router.back()}
                className="mt-6 text-purple-400 hover:underline text-sm"
            >
                ← Volver al historial
            </button>
        </div>
    );
}
