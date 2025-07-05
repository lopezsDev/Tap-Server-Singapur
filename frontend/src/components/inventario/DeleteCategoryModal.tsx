'use client';

import Modal from '@/components/Modal';
import { useState } from 'react';
import { deleteCategory } from '@/lib/api';

interface Props {
    categoryId: number;
    categoryName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DeleteCategoryModal({ categoryId, categoryName, onClose, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteCategory(categoryId);
            onSuccess();
            onClose();
        } catch {
            setError('Solo se puede eliminar si no tiene productos asociados');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Eliminar Categoría" onClose={onClose}>
            <p className="mb-4">
                ¿Estás seguro de que deseas eliminar la categoría{' '}
                <span className="font-semibold text-red-400">{categoryName}</span>? Esta acción no se puede deshacer.
            </p>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                    disabled={loading}
                >
                    Cancelar
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    disabled={loading}
                >
                    {loading ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>
        </Modal>
    );
}
