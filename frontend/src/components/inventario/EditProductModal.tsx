'use client';

import { useState } from 'react';
import { updateProduct } from '@/lib/api';
import Modal from '../Modal';

interface ProductFormData {
    id: number;
    name: string;
    description: string;
    price: number;
    productStatus: 'AVAILABLE' | 'UNAVAILABLE';
    criticalQuantity: number;
    availableQuantity: number;
    category: string;
}

interface Props {
    product: ProductFormData;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditProductModal({ product, onClose, onSuccess }: Props) {
    const [form, setForm] = useState<ProductFormData>(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Para campos numéricos, aceptar solo dígitos o vacío temporal
        if (['price', 'criticalQuantity', 'availableQuantity'].includes(name)) {
            if (/^\d*$/.test(value)) {
                setForm({ ...form, [name]: value === '' ? '' : Number(value) });
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProduct(product.id, form);
            onSuccess();
            onClose();
        } catch {
            alert('Error al actualizar el producto');
        }
    };

    return (
        <Modal title="Editar Producto" onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-h-[80vh] overflow-y-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 text-sm font-semibold text-gray-300">
                            Nombre
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="input"
                            placeholder="Nombre del producto"
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
                            value={form.category}
                            onChange={handleChange}
                            className="input"
                            placeholder="Categoría del producto"
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
                        value={form.description}
                        onChange={handleChange}
                        className="input"
                        placeholder="Descripción breve"
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
                            value={form.price}
                            onChange={handleChange}
                            className="input"
                            placeholder="Precio en USD"
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
                            value={form.criticalQuantity}
                            onChange={handleChange}
                            className="input"
                            placeholder="Mínimo stock"
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
                            value={form.availableQuantity}
                            onChange={handleChange}
                            className="input"
                            placeholder="Stock actual"
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
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
}