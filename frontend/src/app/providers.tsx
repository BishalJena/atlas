'use client';

import { ReactNode } from 'react';
import WalletContextProvider from '@/components/WalletProvider';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <WalletContextProvider>
            {children}
        </WalletContextProvider>
    );
}
