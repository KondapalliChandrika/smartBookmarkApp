'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createBookmark } from '@/lib/queries/bookmarks';
import Navbar from '@/components/Navbar';
import BookmarkGrid from '@/components/BookmarkGrid';
import AddBookmarkModal from '@/components/AddBookmarkModal';
import type { Bookmark, User } from '@/types/bookmark';

interface DashboardClientProps {
    user: User;
    initialBookmarks: Bookmark[];
}

export default function DashboardClient({ user, initialBookmarks }: DashboardClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookmarkCount, setBookmarkCount] = useState(initialBookmarks.length);

    const handleAddBookmark = async (title: string, url: string) => {
        await createBookmark(title, url);
        // The BookmarkGrid component will automatically update via polling
        // Close modal after successful creation
        setIsModalOpen(false);
    };

    const handleBookmarkCountChange = (count: number) => {
        setBookmarkCount(count);
    };

    return (
        <div className="min-h-screen">
            <Navbar user={user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-text-primary mb-2"
                        >
                            My Bookmarks
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-text-muted"
                        >
                            {bookmarkCount} {bookmarkCount === 1 ? 'bookmark' : 'bookmarks'} saved
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium transition-all shadow-lg hover:shadow-primary/50 flex items-center gap-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add Bookmark
                    </motion.button>
                </div>

                {/* Bookmarks grid */}
                <BookmarkGrid
                    initialBookmarks={initialBookmarks}
                    onAddClick={() => setIsModalOpen(true)}
                    onCountChange={handleBookmarkCountChange}
                />
            </main>

            {/* Add bookmark modal */}
            <AddBookmarkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddBookmark}
            />
        </div>
    );
}
