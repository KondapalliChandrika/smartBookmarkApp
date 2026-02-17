'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { deleteBookmark, getBookmarks } from '@/lib/queries/bookmarks';
import BookmarkCard from './BookmarkCard';
import EmptyState from './EmptyState';
import DeleteConfirmModal from './DeleteConfirmModal';
import type { Bookmark } from '@/types/bookmark';

interface BookmarkGridProps {
    initialBookmarks: Bookmark[];
    onAddClick: () => void;
    onCountChange?: (count: number) => void;
}

export default function BookmarkGrid({ initialBookmarks, onAddClick, onCountChange }: BookmarkGridProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
    const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const supabase = createClient();

    // Update bookmarks when initialBookmarks changes
    useEffect(() => {
        setBookmarks(initialBookmarks);
    }, [initialBookmarks]);

    // Update parent component whenever bookmark count changes
    useEffect(() => {
        if (onCountChange) {
            onCountChange(bookmarks.length);
        }
    }, [bookmarks.length, onCountChange]);

    // Poll for changes every 3 seconds (simple and reliable)
    useEffect(() => {
        console.log('Setting up polling for bookmark changes...');

        const pollInterval = setInterval(async () => {
            try {
                const latestBookmarks = await getBookmarks();

                // Only update if there are actual changes
                if (JSON.stringify(latestBookmarks) !== JSON.stringify(bookmarks)) {
                    console.log('📊 Bookmarks updated via polling');
                    setBookmarks(latestBookmarks);
                }
            } catch (error) {
                console.error('Error polling bookmarks:', error);
            }
        }, 3000); // Poll every 3 seconds

        return () => {
            console.log('Cleaning up polling interval');
            clearInterval(pollInterval);
        };
    }, [bookmarks]);

    const handleDeleteClick = (bookmark: Bookmark) => {
        setBookmarkToDelete(bookmark);
    };

    const handleConfirmDelete = async () => {
        if (!bookmarkToDelete) return;

        setIsDeleting(true);
        const previousBookmarks = bookmarks;

        // Optimistic update
        setBookmarks((current) => current.filter((b) => b.id !== bookmarkToDelete.id));
        setBookmarkToDelete(null);

        try {
            await deleteBookmark(bookmarkToDelete.id);
            console.log('✅ Bookmark deleted successfully');
        } catch (error) {
            // Revert on error
            setBookmarks(previousBookmarks);
            console.error('Failed to delete bookmark:', error);
            alert('Failed to delete bookmark. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setBookmarkToDelete(null);
    };

    if (bookmarks.length === 0) {
        return <EmptyState onAddClick={onAddClick} />;
    }

    return (
        <>
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark.id}
                            bookmark={bookmark}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={!!bookmarkToDelete && !isDeleting}
                bookmarkTitle={bookmarkToDelete?.title || ''}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}
