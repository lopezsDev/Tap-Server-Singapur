'use client';

import { useState } from 'react';
import { useProducts } from '@/lib/hooks/useProducts';
import ProductTable from '@/components/inventario/ProductTable';
import EditProductModal from '@/components/inventario/EditProductModal';
import DeleteProductModal from '@/components/inventario/DeleteProductModal';
import OutputProductModal from '@/components/inventario/OutputProductModal';
import InventoryActions from '@/components/inventario/InventoryActions';
import Pagination from '@/components/inventario/Pagination';
import AddProductModal from '@/components/inventario/AddProductModal';

export default function InventoryPage() {
    const {
        products,
        currentPage,
        totalPages,
        error,
        search,
        setSearch,
        loadProducts,
        loading,
        pageSize,
        setPageSize,
    } = useProducts();

    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToWithdraw, setProductToWithdraw] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        loadProducts(1, newSize);
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Gestión de inventario</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p className="text-gray-400">Cargando productos...</p>}

            {!loading && (
                <>
                    <InventoryActions
                        search={search}
                        setSearch={setSearch}
                        onAdd={() => setShowAddModal(true)}
                    />

                    <div className="mb-4">
                        <label className="mr-2 font-semibold" htmlFor="pageSizeSelect">
                            Productos por página:
                        </label>
                        <select
                            id="pageSizeSelect"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="border border-gray-300 rounded px-2 py-1 text-gray-800"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <ProductTable
                        products={products}
                        onEdit={setEditingProduct}
                        onDelete={setProductToDelete}
                        onWithdraw={setProductToWithdraw}
                    />

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(page) => loadProducts(page, pageSize)}
                    />
                </>
            )}

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSuccess={() => loadProducts(currentPage, pageSize)}
                />
            )}

            {productToDelete && (
                <DeleteProductModal
                    productId={productToDelete}
                    onClose={() => setProductToDelete(null)}
                    onSuccess={() => loadProducts(currentPage, pageSize)}
                />
            )}

            {productToWithdraw && (
                <OutputProductModal
                    product={productToWithdraw}
                    onClose={() => setProductToWithdraw(null)}
                    onSuccess={() => loadProducts(currentPage, pageSize)}
                />
            )}

            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => loadProducts(1, pageSize)}
                />
            )}
        </div>
    );
}