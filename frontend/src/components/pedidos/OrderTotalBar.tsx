'use client';

import { Button } from '@/components/ui/Button';

interface Props {
    total: number;
    onConfirm: () => void;
}

export default function OrderTotalBar({ total, onConfirm }: Props) {
    return (
        <div className="flex justify-between items-center mt-8 bg-[#2a1b3d] p-4 rounded-lg">
            <div className="text-xl font-semibold">
                Total:{' '}
                <span className="text-purple-400 font-bold">
          ₡{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
            </div>
            <Button
                onClick={onConfirm}
                className="bg-purple-600 hover:bg-purple-700 text-white"
            >
                Confirmar venta
            </Button>
        </div>
    );
}
