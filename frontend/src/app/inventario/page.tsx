'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, searchProducts } from '@/lib/api';
import ProductTable from '@/components/ProductTable';
import EditProductModal from '@/components/EditProductModal';
import DeleteProductModal from '@/components/DeleteProductModal';
import OutputProductModal from '@/components/OutputProductModal';
import InventoryActions from '@/components/InventoryActions';
import Pagination from '@/components/Pagination';
import AddProductModal from '@/components/AddProductModal';


export default function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToWithdraw, setProductToWithdraw] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [search, setSearch] = useState('');

    const refetchProducts = async () => {
        try {
            const res = await fetchProducts();
            setProducts(res.data);
        } catch {
            setError("Error al cargar los productos");
        }
    };

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!search.trim()) {
                refetchProducts();
                return;
            }

            try {
                const res = await searchProducts(search.trim());
                setProducts(res.data);
            } catch {
                setError("Error al buscar productos");
            }
        }, 400); // ⏱ debounce de 400ms

        return () => clearTimeout(delay);
    }, [search]);


    useEffect(() => {
        refetchProducts();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Gestión de inventario</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <InventoryActions
                search={search}
                setSearch={setSearch}
                onAdd={() => setShowAddModal(true)} />

            <ProductTable
                products={products}
                onEdit={setEditingProduct}
                onDelete={setProductToDelete}
                onWithdraw={setProductToWithdraw}
            />

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSuccess={refetchProducts}
                />
            )}

            {productToDelete && (
                <DeleteProductModal
                    productId={productToDelete}
                    onClose={() => setProductToDelete(null)}
                    onSuccess={refetchProducts}
                />
            )}

            {productToWithdraw && (
                <OutputProductModal
                    product={productToWithdraw}
                    onClose={() => setProductToWithdraw(null)}
                    onSuccess={refetchProducts}
                />
            )}

            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={refetchProducts}
                />
            )}


            <Pagination />

        </div>
    );
}
