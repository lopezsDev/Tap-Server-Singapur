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

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en la solicitud");
    }

    return response.json();
}
