'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 400); // 400 ms debounce

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    useEffect(() => {
        onSearch(debouncedTerm.trim());
    }, [debouncedTerm, onSearch]);

    return (
        <div className="flex items-center bg-[#2a1b3d] rounded-lg p-2 flex-1">
            <Search className="w-5 h-5 text-purple-300" />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos por nombre"
                className="bg-transparent outline-none text-white ml-2 w-full"
            />
        </div>
    );
}
