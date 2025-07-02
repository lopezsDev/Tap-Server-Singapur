'use client';

import { useState } from 'react';
import { updateProduct } from '@/lib/api';
import Modal from './Modal';

export default function EditProductModal({ product, onClose, onSuccess }: any) {
    const [form, setForm] = useState(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProduct(product.id, {
                ...form,
                price: +form.price,
                criticalQuantity: +form.criticalQuantity,
                availableQuantity: +form.availableQuantity,
            });
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
                    <button type="button" className="btn-gray" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="btn-purple">Guardar</button>
                </div>
            </form>
        </Modal>
    );
}
