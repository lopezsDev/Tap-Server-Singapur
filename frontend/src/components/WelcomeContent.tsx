'use client';

export default function WelcomeContent() {
    return (
        <section className="flex flex-col items-center justify-center h-full text-center gap-8 text-white">
            <h1 className="text-4xl font-bold">Bienvenido a Tap & Serve Singapur Bar</h1>
            <p className="text-lg text-zinc-400 max-w-xl">
                Controla inventario y ventas de forma eficiente.
            </p>
            <div className="flex gap-4">
                <a href="/login" className="bg-purple-600 px-6 py-2 rounded-full hover:bg-purple-700 transition">Iniciar sesión</a>
                <a href="/signup" className="border border-purple-500 px-6 py-2 rounded-full hover:bg-purple-800 transition">Registrarse</a>
            </div>
        </section>
    );
}
