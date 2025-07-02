'use client';

import React from 'react';

export default function Modal({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-[#2a1b3d] p-6 rounded-lg w-[95%] max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-white text-xl">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
}
