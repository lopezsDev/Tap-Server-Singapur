import { fetchWithAuth } from './fetchWithAuth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export function fetchProducts(page = 0, size = 15) {
    return fetchWithAuth(`${BASE_URL}/api/products?page=${page}&size=${size}`);
}

export function searchProductsByName(name: string) {
    return fetchWithAuth(
        `${BASE_URL}/api/products/search/${encodeURIComponent(name)}`
    );
}


export function searchProducts(name: string, page = 0, size = 5) {
    return fetchWithAuth(
        `${BASE_URL}/api/products/search/by-name`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, page, size })
        }
    );
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

export function fetchCategories() {
    return fetchWithAuth(`${BASE_URL}/api/categories`);
}

export function fetchCategoryById(id: number) {
    return fetchWithAuth(`${BASE_URL}/api/categories/${id}`);
}

export function createCategory(data: {
    name: string;
    description: string;
    unitOfMeasure: 'ML' | 'OZ' | 'L' | 'TAZA' | 'KG' | 'G';
}) {
    return fetchWithAuth(`${BASE_URL}/api/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}


export function updateCategory(
    id: number,
    data: {
        name: string;
        description: string;
        unitOfMeasure: 'ML' | 'OZ' | 'L' | 'TAZA' | 'KG' | 'G';
    }
) {
    return fetchWithAuth(`${BASE_URL}/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export function deleteCategory(id: number) {
    return fetchWithAuth(`${BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
    });
}

