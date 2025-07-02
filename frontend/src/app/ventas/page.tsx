'use client';

import { useState } from 'react';
import OrderProductSearch from '@/components/pedidos/OrderProductSearch';
import OrderProductTable from '@/components/pedidos/OrderProductTable';
import OrderTotalBar from '@/components/pedidos/OrderTotalBar';
import OrderConfirmModal from '@/components/pedidos/OrderConfirmModal';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export default function VentasPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleQuantityChange = (id: number, change: number) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, quantity: Math.max(product.quantity + change, 0) }
                    : product
            )
        );
    };

    const handleAddProduct = (product: { id: number; name: string; price: number }) => {
        setProducts((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <div className="p-6 w-full text-white">
            <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>

            <OrderProductSearch onAdd={handleAddProduct} />

            <Link
                href="/ventas/historial"
                className="text-purple-400 hover:underline text-sm ml-auto mb-4 block"
            >
                Ver historial de pedidos →
            </Link>

            <OrderProductTable products={products} onChangeQuantity={handleQuantityChange} />

            {products.length > 0 && (
                <>
                    <OrderTotalBar
                        total={products.reduce((acc, p) => acc + p.price * p.quantity, 0)}
                        onConfirm={() => setShowConfirmModal(true)}
                    />
                    {showConfirmModal && (
                        <OrderConfirmModal
                            products={products}
                            onClose={() => setShowConfirmModal(false)}
                            onSuccess={() => {
                                setProducts([]);
                                setShowConfirmModal(false);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
}
