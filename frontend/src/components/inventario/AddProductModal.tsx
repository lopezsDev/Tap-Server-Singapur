'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { createProduct } from '@/lib/api';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddProductModal({ onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        productStatus: 'AVAILABLE' as 'AVAILABLE' | 'UNAVAILABLE',
        criticalQuantity: '',
        availableQuantity: '',
        category: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (['price', 'criticalQuantity', 'availableQuantity'].includes(name)) {
            if (/^\d*$/.test(value)) { // Solo números o vacío temporalmente
                setForm(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                price: Number(form.price),
                criticalQuantity: Number(form.criticalQuantity),
                availableQuantity: Number(form.availableQuantity),
            };
            await createProduct(payload);
            onSuccess();
            onClose();
        } catch {
            setError('Error al crear el producto');
        }
    };

    return (
        <Modal title="Nuevo Producto" onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-h-[80vh] overflow-y-auto"
            >
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 text-sm font-semibold text-gray-300">
                            Nombre
                        </label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Nombre del producto"
                            value={form.name}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="mb-1 text-sm font-semibold text-gray-300">
                            Categoría
                        </label>
                        <input
                            id="category"
                            name="category"
                            placeholder="Categoría"
                            value={form.category}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1 text-sm font-semibold text-gray-300">
                        Descripción
                    </label>
                    <input
                        id="description"
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="price" className="mb-1 text-sm font-semibold text-gray-300">
                            Precio
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="Precio"
                            value={form.price}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="productStatus" className="mb-1 text-sm font-semibold text-gray-300">
                            Estado
                        </label>
                        <select
                            id="productStatus"
                            name="productStatus"
                            value={form.productStatus}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="AVAILABLE">Disponible</option>
                            <option value="UNAVAILABLE">No disponible</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="criticalQuantity" className="mb-1 text-sm font-semibold text-gray-300">
                            Cantidad Crítica
                        </label>
                        <input
                            id="criticalQuantity"
                            name="criticalQuantity"
                            type="text"
                            placeholder="Cantidad crítica"
                            value={form.criticalQuantity}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="availableQuantity" className="mb-1 text-sm font-semibold text-gray-300">
                            Cantidad Disponible
                        </label>
                        <input
                            id="availableQuantity"
                            name="availableQuantity"
                            type="text"
                            placeholder="Cantidad disponible"
                            value={form.availableQuantity}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Crear
                    </button>
                </div>
            </form>
        </Modal>
    );
}
