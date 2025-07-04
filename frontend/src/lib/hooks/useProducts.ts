'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, searchProducts } from '@/lib/api';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(15); // valor por defecto

    const loadProducts = async (page = 1, size = pageSize) => {
        setLoading(true);
        try {
            const res = await fetchProducts(page - 1, size);
            setProducts(res.data?.content ?? []);
            setTotalPages(res.data?.totalPages ?? 1);
            setCurrentPage(page);
            setError(null);
            setPageSize(size);
        } catch {
            setProducts([]);
            setTotalPages(1);
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    const loadSearchResults = async (query: string, size = pageSize) => {
        setLoading(true);
        try {
            const res = await searchProducts(query);
            setProducts(res.data?.content ?? []);
            setTotalPages(res.data?.totalPages ?? 1);
            setCurrentPage(1);
            setError(null);
            setPageSize(size);
        } catch {
            setProducts([]);
            setTotalPages(1);
            setError('Error al buscar productos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            if (!search.trim()) {
                loadProducts(1, pageSize);
            } else {
                loadSearchResults(search.trim(), pageSize);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [search, pageSize]);

    useEffect(() => {
        loadProducts(1, pageSize);
    }, []);

    return {
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
    };
}
