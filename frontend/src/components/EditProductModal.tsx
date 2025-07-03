'use client';

import { useState } from 'react';
import { updateProduct } from '@/lib/api';
import Modal from './Modal';

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

        // Convertimos los valores numéricos a number
        const parsedValue = ['price', 'criticalQuantity', 'availableQuantity'].includes(name)
            ? Number(value)
            : value;

        setForm({ ...form, [name]: parsedValue });
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
            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="name" value={form.name} onChange={handleChange} className="input" required />
                <input name="description" value={form.description} onChange={handleChange} className="input" required />
                <input name="price" type="number" value={form.price} onChange={handleChange} className="input" required />
                <select name="productStatus" value={form.productStatus} onChange={handleChange} className="input">
                    <option value="AVAILABLE">Disponible</option>
                    <option value="UNAVAILABLE">No disponible</option>
                </select>
                <input name="criticalQuantity" type="number" value={form.criticalQuantity} onChange={handleChange} className="input" required />
                <input name="availableQuantity" type="number" value={form.availableQuantity} onChange={handleChange} className="input" required />
                <input name="category" value={form.category} onChange={handleChange} className="input" required />

                <div className="flex justify-end gap-4 pt-2">
                    <button type="button" className="btn-gray" onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn-purple">
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
}
