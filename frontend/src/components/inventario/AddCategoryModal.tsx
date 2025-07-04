'use client';

import Modal from '@/components/Modal';
import { useState } from 'react';
import { createCategory } from '@/lib/api';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const units = ['ML', 'OZ', 'L', 'TAZA', 'KG', 'G'] as const;

type UnitMeasure = typeof units[number];

export default function AddCategoryModal({ onClose, onSuccess }: Props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState<UnitMeasure>('ML');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!name.trim() || !description.trim()) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            setLoading(true);
            await createCategory({
                name: name.trim(),
                description: description.trim(),
                unitOfMeasure: unit,
            });
            onSuccess();
            onClose();
        } catch {
            setError('Error al crear la categoría');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Nueva Categoría" onClose={onClose}>
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
                        onClick={handleSubmit}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
