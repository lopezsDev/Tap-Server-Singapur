'use client';

interface Props {
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

export default function Pagination({ totalPages = 5, currentPage = 1, onPageChange }: Props) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-6 gap-2">
            {pages.map((n) => (
                <button
                    key={n}
                    onClick={() => onPageChange?.(n)}
                    className={`w-8 h-8 rounded-full ${
                        n === currentPage ? 'bg-purple-600' : 'hover:bg-purple-700'
                    }`}
                >
                    {n}
                </button>
            ))}
        </div>
    );
}
