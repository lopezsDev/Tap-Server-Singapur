'use client';

import Modal from '@/components/Modal';
import { useState } from 'react';
import { createOrder } from '@/lib/api';

interface Props {
    products: { id: number; name: string; quantity: number }[];
    onClose: () => void;
    onSuccess: () => void;
}

export default function OrderConfirmModal({ products, onClose, onSuccess }: Props) {
    const [observations, setObservations] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        const payload = {
            observations,
            products: products.map(p => ({ productId: p.id, quantity: p.quantity })),
        };

        try {
            setLoading(true);
            await createOrder(payload);
            onSuccess();
        } catch {
            setError('Error al confirmar el pedido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Confirmar Pedido" onClose={onClose}>
            <div className="space-y-4">
        <textarea
            className="w-full p-2 rounded bg-[#3a2b4f] text-white"
            rows={4}
            placeholder="Observaciones (opcional)"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
        />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                        disabled={loading}
                    >
                        {loading ? 'Confirmando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
