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
    const [pageSize, setPageSize] = useState(15);

    const loadProducts = async (page = 1, size = pageSize) => {
        setLoading(true);
        try {
            const res = await fetchProducts(page - 1, size);
            setProducts(res.data?.content ?? []);
            setTotalPages(res.data?.totalPages ?? 1);
            setCurrentPage(page);
            setError(null);
        } catch {
            setProducts([]);
            setTotalPages(1);
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    const loadSearchResults = async (query: string, page = 1, size = pageSize) => {
        setLoading(true);
        try {
            const res = await searchProducts(query, page - 1, size);
            setProducts(res.data?.content ?? []);
            setTotalPages(res.data?.totalPages ?? 1);
            setCurrentPage(page);
            setError(null);
        } catch {
            setProducts([]);
            setTotalPages(1);
            setError('Error al buscar productos');
        } finally {
            setLoading(false);
        }
    };

    const loadPage = (page: number, size = pageSize) => {
        if (!search.trim()) {
            loadProducts(page, size);
        } else {
            loadSearchResults(search.trim(), page, size);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            loadPage(1);
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
        loadProducts: loadPage,
        loading,
        pageSize,
        setPageSize,
    };
}
