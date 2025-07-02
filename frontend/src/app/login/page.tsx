'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username: formData.username, password: formData.password });
            router.push('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido al iniciar sesión');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1c1326]">
            <form onSubmit={handleSubmit} className="bg-[#2a1b3d] p-8 rounded-lg w-80 space-y-4 text-white">
                <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div>
                    <label className="block text-sm">Nombre de usuario</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Ingrese su nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded">
                    Iniciar sesión
                </button>

                <div className="text-center text-sm mt-4">
                    ¿No tienes cuenta?{' '}
                    <a href="/signup" className="text-purple-400 hover:underline">
                        Regístrate
                    </a>
                </div>
            </form>
        </div>
    );
}