import { logout } from './auth';
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401 || response.status === 403) {
        console.warn('Token inválido o expirado, cerrando sesión...');
        logout();
        window.location.href = '/login';
        throw new Error('No autorizado');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en la solicitud");
    }

    return response.json();
}
