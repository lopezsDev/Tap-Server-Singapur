'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Props {
    products: Product[];
    onChangeQuantity: (id: number, delta: number) => void;
}

export default function OrderProductTable({ products, onChangeQuantity }: Props) {
    const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    return (
        <div className="border border-[#3a2b4f] mt-6 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-[#2a1b3d] p-4 font-semibold">
                <span>Producto</span>
                <span className="text-center">Cantidad</span>
                <span className="text-right">Subtotal</span>

            </div>

            {products.map((product) => (
                <div
                    key={product.id}
                    className="grid grid-cols-3 items-center p-4 border-t border-[#3a2b4f]"
                >
                    <span>{product.name}</span>
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-purple-400 hover:text-white"
                            onClick={() => onChangeQuantity(product.id, -1)}
                        >
                            <Minus />
                        </Button>
                        <div className="w-8 text-center">{product.quantity}</div>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-purple-400 hover:text-white"
                            onClick={() => onChangeQuantity(product.id, 1)}
                        >
                            <Plus />
                        </Button>
                    </div>
                    <div className="text-right">
                        ₡{(product.price * product.quantity).toLocaleString()}
                    </div>
                </div>
            ))}
            <div className="grid grid-cols-3 items-center p-4 border-t border-[#3a2b4f] bg-[#1c1326] font-semibold text-lg">
                <span >Total</span>
                <span className="text-center"></span>
                <div className="text-right text-green-400">
                    ₡{total.toLocaleString()}
                </div>
            </div>
        </div>
    );
}
