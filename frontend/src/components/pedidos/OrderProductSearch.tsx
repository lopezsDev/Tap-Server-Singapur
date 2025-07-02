'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { searchProducts } from '@/lib/api';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Props {
    onAdd: (product: Product) => void;
}

export default function OrderProductSearch({ onAdd }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            try {
                const res = await searchProducts(query.trim());
                setResults(res.data);
                setShowResults(true);
            } catch {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className="relative w-full max-w-md">
            <div className="flex items-center bg-[#2a1b3d] p-2 rounded-lg">
                <Search className="text-purple-300 w-5 h-5" />
                <Input
                    placeholder="Buscar productos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent border-none text-white ml-2"
                />
            </div>

            {showResults && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-[#1c1326] border border-zinc-700 rounded shadow-lg max-h-60 overflow-y-auto">
                    {results.map((product) => (
                        <div
                            key={product.id}
                            className="px-4 py-2 hover:bg-[#3a2b4f] cursor-pointer text-white"
                            onClick={() => {
                                onAdd({ ...product });
                                setQuery('');
                                setResults([]);
                                setShowResults(false);
                            }}
                        >
                            {product.name} - ₡{product.price.toLocaleString()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
