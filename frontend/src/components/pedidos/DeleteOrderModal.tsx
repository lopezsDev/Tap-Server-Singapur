'use client';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export default function DeleteOrderModal({
                                         isOpen,
                                         onClose,
                                         onConfirm,
                                         title = '¿Estás seguro?',
                                         message = 'Esta acción no se puede deshacer.',
                                     }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-[#2a1b3d] p-6 rounded-xl shadow-lg max-w-sm w-full text-white">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-sm text-zinc-300 mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-1 rounded-md bg-zinc-600 hover:bg-zinc-500 text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-500 text-sm"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
