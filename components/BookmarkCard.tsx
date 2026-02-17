'use client';

import { motion } from 'framer-motion';
import type { Bookmark } from '@/types/bookmark';

interface BookmarkCardProps {
    bookmark: Bookmark;
    onDeleteClick: (bookmark: Bookmark) => void;
}

export default function BookmarkCard({ bookmark, onDeleteClick }: BookmarkCardProps) {
    const getDomain = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    const getFavicon = (url: string) => {
        try {
            const urlObj = new URL(url);
            return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
        } catch {
            return null;
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDeleteClick(bookmark);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
        >


            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Favicon */}
                    {getFavicon(bookmark.url) && (
                        <div className="w-12 h-12 rounded-xl bg-background-lighter flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
                            <img
                                src={getFavicon(bookmark.url)!}
                                alt=""
                                className="w-8 h-8"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-text-primary mb-1 truncate group-hover:text-primary-light transition-colors">
                            {bookmark.title}
                        </h3>
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-text-muted hover:text-primary-light transition-colors truncate block relative z-10"
                        >
                            {getDomain(bookmark.url)}
                        </a>
                        <p className="text-xs text-text-muted mt-2">
                            {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>

                {/* Delete button */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDeleteClick}
                    className="relative z-20 flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center justify-center"
                    title="Delete bookmark"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </motion.button>
            </div>

            {/* Visit link overlay */}
            <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 rounded-2xl z-0"
                aria-label={`Visit ${bookmark.title}`}
            />
        </motion.div>
    );
}
