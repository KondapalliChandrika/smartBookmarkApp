import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SmartBookmark - Your Personal Bookmark Manager',
    description: 'Organize and sync your bookmarks with real-time updates across all devices',
    keywords: ['bookmarks', 'bookmark manager', 'organization', 'productivity'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
