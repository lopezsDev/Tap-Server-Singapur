'use client';

import { deleteProduct } from '@/lib/api';
import Modal from '../Modal';

interface Props {
    productId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DeleteProductModal({ productId, onClose, onSuccess }: Props)
 {
    const handleDelete = async () => {
        try {
            await deleteProduct(productId);
            onSuccess();
            onClose();
        } catch {
            alert('Error al eliminar el producto');
        }
    };

    return (
        <Modal title="¿Eliminar producto?" onClose={onClose}>
            <p className="mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="flex justify-end gap-4">
                <button className="btn-gray" onClick={onClose}>Cancelar</button>
                <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Eliminar</button>
            </div>
        </Modal>
    );
}
