'use client';

import { useState } from 'react';
import { withdrawProduct } from '@/lib/api';
import Modal from './Modal';

export default function OutputProductModal({ product, onClose, onSuccess }: any) {
    const [withdrawnQuantity, setWithdrawnQuantity] = useState('');
    const [retirementReason, setRetirementReason] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await withdrawProduct(product.id, {
                withdrawnQuantity: Number(withdrawnQuantity),
                retirementReason
            });
            onSuccess();
            onClose();
        } catch {
            alert('Error al retirar el producto');
        }
    };

    return (
        <Modal title="Retirar Producto" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="number" value={withdrawnQuantity} onChange={e => setWithdrawnQuantity(e.target.value)} className="input" placeholder="Cantidad a retirar" required />
                <input type="text" value={retirementReason} onChange={e => setRetirementReason(e.target.value)} className="input" placeholder="Motivo del retiro" required />

                <div className="flex justify-end gap-4 pt-2">
                    <button type="button" className="btn-gray" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="btn-purple">Confirmar</button>
                </div>
            </form>
        </Modal>
    );
}
