'use client';

import { useEffect, useState } from 'react';
import { fetchCategories } from '@/lib/api';
import Modal from '@/components/Modal';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import AddCategoryModal from "@/components/inventario/AddCategoryModal";
import EditCategoryModal from "@/components/inventario/EditCategoryModal";
import DeleteCategoryModal from "@/components/inventario/DeleteCategoryModal";

interface Category {
    id: number;
    name: string;
    description: string;
    unitMeasure: 'ML' | 'OZ' | 'L' | 'TAZA' | 'KG' | 'G';
}

interface Props {
    onClose: () => void;
}

export default function ManageCategoriesModal({ onClose }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const res = await fetchCategories();
            setCategories(res.data);
        } catch {
            setError('Error al cargar las categorías');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Modal title="Gestionar Categorías" onClose={onClose}>
            <div className="space-y-4">
                <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                    onClick={() => setShowAddModal(true)}
                >
                    <PlusCircle className="w-5 h-5" /> Añadir categoría
                </button>

                {/* Tabla */}
                {loading && <p className="text-zinc-400">Cargando categorías...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && categories.length === 0 && (
                    <p className="text-zinc-400">No hay categorías registradas.</p>
                )}

                {!loading && categories.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-separate border-spacing-y-2">
                            <thead>
                            <tr className="text-purple-300">
                                <th className="text-left">Nombre</th>
                                <th className="text-left">Descripción</th>
                                <th className="text-left">Unidad</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id} className="bg-[#3a2b4f] rounded-lg">
                                    <td className="px-2 py-1">{cat.name}</td>
                                    <td className="px-2 py-1">{cat.description}</td>
                                    <td className="px-2 py-1">{cat.unitMeasure}</td>
                                    <td className="px-2 py-1 text-right flex gap-2 justify-end">
                                        <button
                                            className="text-yellow-400 hover:text-yellow-500"
                                            onClick={() => setEditingCategory(cat)}
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => setDeletingCategory(cat)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showAddModal && (
                <AddCategoryModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={loadCategories}
                />
            )}

            {editingCategory && (
                <EditCategoryModal
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                    onSuccess={loadCategories}
                />
            )}

            {deletingCategory && (
                <DeleteCategoryModal
                    categoryId={deletingCategory.id}
                    categoryName={deletingCategory.name}
                    onClose={() => setDeletingCategory(null)}
                    onSuccess={loadCategories}
                />
            )}
        </Modal>
    );
}