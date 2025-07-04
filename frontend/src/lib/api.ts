import { fetchWithAuth } from './fetchWithAuth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export function fetchProducts(page = 0, size = 15) {
    return fetchWithAuth(`${BASE_URL}/api/products?page=${page}&size=${size}`);
}

export function searchProducts(name: string) {
    return fetchWithAuth(`${BASE_URL}/api/products/search?name=${encodeURIComponent(name)}`);
}

export function deleteProduct(id: number) {
    return fetchWithAuth(`${BASE_URL}/api/products/${id}`, {
        method: 'DELETE'
    });
}

export function updateProduct(id: number, data: {
    name: string;
    description: string;
    price: number;
    productStatus: 'AVAILABLE' | 'UNAVAILABLE';
    criticalQuantity: number;
    availableQuantity: number;
    category: string;
}) {
    return fetchWithAuth(`${BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export function withdrawProduct(id: number, payload: {
    withdrawnQuantity: number;
    retirementReason: string;
}) {
    return fetchWithAuth(`${BASE_URL}/api/products/output-product/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function createProduct(data: {
    name: string;
    description: string;
    price: number;
    productStatus: 'AVAILABLE' | 'UNAVAILABLE';
    criticalQuantity: number;
    availableQuantity: number;
    category: string;
}) {
    return fetchWithAuth(`${BASE_URL}/api/products`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function deleteOrder(id: number) {
    return fetchWithAuth(`${BASE_URL}/api/order/${id}`, {
        method: 'DELETE',
    });
}

export function createOrder(data: {
    observations: string;
    products: { productId: number; quantity: number }[];
}) {
    return fetchWithAuth(`${BASE_URL}/api/order`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function fetchOrders() {
    return fetchWithAuth(`${BASE_URL}/api/order`);
}

export function fetchOrderById(id: number) {
    return fetchWithAuth(`${BASE_URL}/api/order/${id}`);
}
