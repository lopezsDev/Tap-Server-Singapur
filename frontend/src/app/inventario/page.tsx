import { PlusCircle, Filter, Pencil, Trash2, Search } from "lucide-react";

const products = [
    { name: "Imperial", category: "Cerveza", stock: 150, alert: "Normal" },
    { name: "Margarita", category: "Coctel", stock: 50, alert: "Bajo" },
    { name: "Carne mexicana", category: "Bocas", stock: 200, alert: "Normal" },
    { name: "Pilsen", category: "Cerveza", stock: 30, alert: "Bajo" },
    { name: "Fanta naranja", category: "Refresco", stock: 100, alert: "Normal" },
];

export default function HomePage() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Gestión de inventario</h2>
            <div className="flex items-center gap-4 mb-6">
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-white flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" /> Añadir producto
                </button>
            </div>
            <div className="flex items-center mb-4 gap-2">
                <div className="flex items-center bg-[#2a1b3d] rounded-lg p-2 flex-1">
                    <Search className="w-5 h-5 text-purple-300" />
                    <input type="text" placeholder="Buscar productos" className="bg-transparent outline-none text-white ml-2 w-full" />
                </div>
                <button className="bg-[#2a1b3d] p-2 rounded-lg">
                    <Filter className="w-5 h-5 text-purple-300" />
                </button>
            </div>

            <table className="w-full border-separate border-spacing-y-2">
                <thead>
                <tr>
                    <th className="text-left">Nombre de producto</th>
                    <th className="text-left">Categoría</th>
                    <th className="text-left">Stock</th>
                    <th className="text-left">Alerta inventario</th>
                    <th className="text-left">Acción</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p, index) => (
                    <tr key={index} className="bg-[#2a1b3d] rounded-lg">
                        <td className="py-2 px-4">{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.stock}</td>
                        <td>
                <span className={`px-4 py-1 rounded-full ${p.alert === "Bajo" ? "bg-red-500" : "bg-purple-700"}`}>
                  {p.alert}
                </span>
                        </td>
                        <td>
                            <div className="flex gap-2">
                                <button>
                                    <Pencil className="text-purple-300 w-4 h-4" />
                                </button>
                                <button>
                                    <Trash2 className="text-red-400 w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-6 gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className={`w-8 h-8 rounded-full ${n === 1 ? "bg-purple-600" : "hover:bg-purple-700"}`}>{n}</button>
                ))}
            </div>
        </div>
    );
}
