import { fetchWithAuth } from './fetchWithAuth';

export function fetchProducts() {
    return fetchWithAuth('http://localhost:8080/api/products');
}

export function searchProducts(name: string) {
    return fetchWithAuth(`http://localhost:8080/api/products/search?name=${encodeURIComponent(name)}`);
}

export function deleteProduct(id: number) {
    return fetchWithAuth(`http://localhost:8080/api/products/${id}`, {
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
    return fetchWithAuth(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export function withdrawProduct(id: number, payload: {
    withdrawnQuantity: number,
    retirementReason: string }) {
    return fetchWithAuth(`http://localhost:8080/api/products/output-product/${id}`, {
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
    return fetchWithAuth('http://localhost:8080/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function deleteOrder(id: number) {
    return fetchWithAuth(`http://localhost:8080/api/order/${id}`, {
        method: 'DELETE',
    });
}

export function createOrder(data: {
    observations: string;
    products: { productId: number; quantity: number }[];
}) {
    return fetchWithAuth('http://localhost:8080/api/order', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function fetchOrders() {
    return fetchWithAuth('http://localhost:8080/api/order');
}

export function fetchOrderById(id: number) {
    return fetchWithAuth(`http://localhost:8080/api/order/${id}`);
}


