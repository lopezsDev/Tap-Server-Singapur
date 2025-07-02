'use client';

import { useAuth } from '@/context/AuthContext';
import WelcomeContent from '@/components/WelcomeContent';
import DashboardEntry from '@/components/DashboardEntry';

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <DashboardEntry /> : <WelcomeContent />;
}
