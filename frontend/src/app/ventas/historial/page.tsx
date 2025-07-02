'use client';

import { useEffect, useState } from 'react';
import OrdersList from '@/components/pedidos/OrderHistoryList';
import { fetchOrders, deleteOrder } from '@/lib/api';

export default function OrdersHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetchOrders = async () => {
        try {
            const res = await fetchOrders();
            setOrders(res.data);
        } catch {
            setError('Error al cargar el historial de pedidos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteOrder(id);
            refetchOrders();
        } catch {
            alert('Error al eliminar el pedido');
        }
    };

    useEffect(() => {
        refetchOrders();
    }, []);

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">Historial de pedidos</h1>

            {loading && <p className="text-zinc-400">Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <OrdersList orders={orders} onDelete={handleDelete} />
            )}
        </div>
    );
}
