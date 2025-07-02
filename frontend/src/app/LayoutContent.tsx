'use client';

import {Sidebar} from "@/components/Sidebar";
import {Footer} from "@/components/Footer";
import {useAuth} from "@/context/AuthContext";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <Sidebar />}
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-8 overflow-auto">{children}</main>
                {isAuthenticated && <Footer />}
            </div>
        </>
    );
}