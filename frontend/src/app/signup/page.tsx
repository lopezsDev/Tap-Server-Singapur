'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ROLES = ['ADMIN', 'WAITER', 'CHEF', 'USER'];
const PERMISSIONS = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

export default function SignupPage() {
    const { signup } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastname: '',
        rol: 'USER' as 'ADMIN' | 'WAITER' | 'CHEF' | 'USER',
        permissions: [] as number[],
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (index: number) => {
        const permissionId = index + 1;
        setFormData(prev => {
            const exists = prev.permissions.includes(permissionId);
            const updated = exists
                ? prev.permissions.filter(i => i !== permissionId)
                : [...prev.permissions, permissionId];
            return { ...prev, permissions: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (!formData.permissions.length) {
            setError('Debes seleccionar al menos un permiso');
            return;
        }

        try {
            const payload = {
                username: formData.username,
                password: formData.password,
                name: formData.name,
                lastname: formData.lastname,
                rol: formData.rol,
                permissions: formData.permissions,
            };

            await signup(payload);
            router.push('/login');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido al registrar');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1c1326]">
            <form onSubmit={handleSubmit} className="bg-[#2a1b3d] p-8 rounded-lg w-96 space-y-4 text-white">
                <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    required
                />

                <input
                    type="text"
                    name="lastname"
                    placeholder="Apellidos"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    required
                />

                <div>
                    <label className="block text-sm mb-1">Rol</label>
                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#3a2b4f] text-white"
                    >
                        {ROLES.map(role => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Permisos</label>
                    <div className="flex flex-wrap gap-3 text-sm">
                        {PERMISSIONS.map((perm, i) => (
                            <label key={perm} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.permissions.includes(i+1)}
                                    onChange={() => handlePermissionChange(i)}
                                    className="accent-purple-600"
                                />
                                {perm}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded transition"
                >
                    Registrarse
                </button>

                <div className="text-center text-sm mt-4">
                    ¿Ya tienes cuenta?{' '}
                    <a href="/login" className="text-purple-400 hover:underline">
                        Inicia sesión
                    </a>
                </div>
            </form>
        </div>
    );
}
