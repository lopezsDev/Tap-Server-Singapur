"use client"

import { useState } from "react"
import { Minus, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

type Product = {
    id: number
    name: string
    price: number
    quantity: number
}

const initialProducts: Product[] = [
    { id: 1, name: "Hamburguesa Clásica", price: 1000, quantity: 2 },
    { id: 2, name: "Pilsen", price: 1500, quantity: 1 },
    { id: 3, name: "Refresco", price: 1000, quantity: 1 },
]

export default function VentasPage() {
    const [products, setProducts] = useState(initialProducts)

    const handleQuantity = (id: number, change: number) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, quantity: Math.max(product.quantity + change, 0) }
                    : product
            )
        )
    }

    const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0)

    return (
        <div className="p-8 w-full text-white">
            <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>

            <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                    <Input
                        type="text"
                        placeholder="Buscar producto"
                        className="bg-zinc-800 border-none pl-10 placeholder:text-zinc-400"
                    />
                    <Filter className="absolute right-3 top-2.5 h-5 w-5 text-zinc-400" />
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    Agregar a la venta
                </Button>
            </div>

            <div className="border border-zinc-700 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-zinc-800 p-4 font-semibold">
                    <span>Producto</span>
                    <span className="text-center">Cantidad</span>
                    <span className="text-right">Subtotal</span>
                </div>

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="grid grid-cols-3 items-center p-4 border-t border-zinc-700"
                    >
                        <span>{product.name}</span>
                        <div className="flex items-center justify-center gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-violet-500 hover:text-white"
                                onClick={() => handleQuantity(product.id, -1)}
                            >
                                <Minus />
                            </Button>
                            <div className="w-8 text-center">{product.quantity}</div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-violet-500 hover:text-white"
                                onClick={() => handleQuantity(product.id, 1)}
                            >
                                <Plus />
                            </Button>
                        </div>
                        <div className="text-right">
                            ₡{(product.price * product.quantity).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-8 bg-zinc-800 p-4 rounded-lg">
                <div className="text-xl font-semibold">
                    Total: <span className="text-violet-400 font-bold">₡{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    Confirmar venta
                </Button>
            </div>
        </div>
    )
}
