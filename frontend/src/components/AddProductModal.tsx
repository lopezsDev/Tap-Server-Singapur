'use client';

import { useState } from 'react';
import Modal from './Modal';
import { createProduct } from '@/lib/api';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddProductModal({ onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        productStatus: 'AVAILABLE' as 'AVAILABLE' | 'UNAVAILABLE',
        criticalQuantity: 0,
        availableQuantity: 0,
        category: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' || name.includes('Quantity') ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct(form);
            onSuccess();
            onClose();
        } catch (err) {
            setError('Error al crear el producto');
        }
    };

    return (
        <Modal title="Nuevo Producto" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-3">
                {error && <p className="text-red-500">{error}</p>}

                <input
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <select
                    name="productStatus"
                    value={form.productStatus}
                    onChange={handleChange}
                    className="input"
                >
                    <option value="AVAILABLE">Disponible</option>
                    <option value="UNAVAILABLE">No disponible</option>
                </select>
                <input
                    name="criticalQuantity"
                    type="number"
                    placeholder="Cantidad crítica"
                    value={form.criticalQuantity}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    name="availableQuantity"
                    type="number"
                    placeholder="Cantidad disponible"
                    value={form.availableQuantity}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    name="category"
                    placeholder="Categoría"
                    value={form.category}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <div className="flex justify-end gap-4 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-gray"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-purple"
                    >
                        Crear
                    </button>
                </div>
            </form>
        </Modal>
    );
}
