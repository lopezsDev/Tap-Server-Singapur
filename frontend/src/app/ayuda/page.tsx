'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const helpTopics = [
    {
        title: '¿Cómo agregar un nuevo producto?',
        content:
            'Para agregar un nuevo producto, ve a la sección de Inventario y haz clic en el botón "Añadir producto". Llena el formulario con la información requerida y guarda los cambios.',
    },
    {
        title: '¿Cómo registrar una venta?',
        content:
            'En la sección de Ventas, busca los productos deseados usando la barra de búsqueda. Agrégalos a la venta y ajusta las cantidades. Finalmente, confirma la venta.',
    },
    {
        title: '¿Cómo eliminar un pedido?',
        content:
            'Para eliminar un pedido, dirígete al historial de pedidos, selecciona el pedido y haz clic en el botón de eliminar.',
    },
    {
        title: '¿Cómo cambiar mi contraseña?',
        content:
            'Actualmente, para cambiar la contraseña debes contactar con el administrador del sistema.',
    },
];

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Centro de Ayuda</h1>
            <p className="mb-4 text-white-300">
                Aquí encontrarás respuestas a las preguntas más frecuentes sobre el uso de la aplicación.
            </p>

            <div className="space-y-4">
                {helpTopics.map((topic, index) => (
                    <div
                        key={index}
                        className="bg-[#2a1b3d] rounded-lg shadow-md border border-[#3a2b4f]"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-purple-400 hover:bg-[#3a2a55] rounded-lg"
                        >
                            {topic.title}
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-purple-300" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-purple-300" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="p-4 border-t border-[#3a2b4f] text-zinc-300">
                                {topic.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
