'use client';

import Modal from '@/components/Modal';
import { useState } from 'react';
import { updateCategory } from '@/lib/api';

interface Category {
    id: number;
    name: string;
    description: string;
    unitMeasure: 'ML' | 'OZ' | 'L' | 'TAZA' | 'KG' | 'G';
}

interface Props {
    category: Category;
    onClose: () => void;
    onSuccess: () => void;
}

const units = ['ML', 'OZ', 'L', 'TAZA', 'KG', 'G'] as const;
type UnitMeasure = typeof units[number];

export default function EditCategoryModal({ category, onClose, onSuccess }: Props) {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [unit, setUnit] = useState<UnitMeasure>(category.unitMeasure);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async () => {
        if (!name.trim() || !description.trim()) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            setLoading(true);
            await updateCategory(category.id, {
                name: name.trim(),
                description: description.trim(),
                unitOfMeasure: unit,
            });
            onSuccess();
            onClose();
        } catch {
            setError('Error al actualizar la categoría');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={`Editar Categoría: ${category.name}`} onClose={onClose}>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                />
                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    rows={3}
                />
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as UnitMeasure)}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                >
                    {units.map((u) => (
                        <option key={u} value={u}>
                            {u}
                        </option>
                    ))}
                </select>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                        disabled={loading}
                    >
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}