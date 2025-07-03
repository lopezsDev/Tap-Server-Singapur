'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface LoginCredentials {
    username: string;
    password: string;
}

interface SignupPayload {
    username: string;
    password: string;
    name: string;
    lastname: string;
    rol: 'ADMIN' | 'CHEF' | 'WAITER' | 'USER';
    permissions: number[];
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (payload: SignupPayload) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = async ({ username, password }: LoginCredentials) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Error al iniciar sesión');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const signup = async (payload: SignupPayload) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Error al registrar el usuario');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};
