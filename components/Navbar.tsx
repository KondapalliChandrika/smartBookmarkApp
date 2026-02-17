'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { User } from '@/types/bookmark';

interface NavbarProps {
    user: User;
}

export default function Navbar({ user }: NavbarProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'User';
    const avatarUrl = user.user_metadata?.avatar_url;

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 glass border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                            SmartBookmark
                        </span>
                    </div>

                    {/* User section */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-text-primary">{displayName}</p>
                            <p className="text-xs text-text-muted">{user.email || 'No email'}</p>
                        </div>

                        {avatarUrl && (
                            <Image
                                src={avatarUrl}
                                alt="User avatar"
                                width={40}
                                height={40}
                                className="rounded-full ring-2 ring-primary/50"
                            />
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-500/50"
                        >
                            Logout
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
