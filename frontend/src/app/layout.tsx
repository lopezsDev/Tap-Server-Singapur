import './globals.css';
import { AuthProvider} from '@/context/AuthContext';
import LayoutContent from '@/app/LayoutContent'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body className="flex h-screen bg-[#1c1326] text-white">
        <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
        </body>
        </html>
    );
}
