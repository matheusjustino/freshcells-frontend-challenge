import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/app.provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FRESHCELLS',
    description: 'Challenge Application Test',
};

export default function RootLayout({
    children,
    ...props
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AppProviders pageProps={props}>{children}</AppProviders>
            </body>
        </html>
    );
}
