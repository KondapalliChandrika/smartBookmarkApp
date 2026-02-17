'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AddBookmarkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, url: string) => Promise<void>;
}

export default function AddBookmarkModal({ isOpen, onClose, onAdd }: AddBookmarkModalProps) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validateUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            setError('Please enter a title');
            return;
        }

        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        if (!validateUrl(url)) {
            setError('Please enter a valid URL (include http:// or https://)');
            return;
        }

        setIsLoading(true);
        try {
            await onAdd(title.trim(), url.trim());
            setTitle('');
            setUrl('');
            onClose();
        } catch (err) {
            setError('Failed to add bookmark. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setTitle('');
            setUrl('');
            setError('');
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass rounded-2xl p-8 w-full max-w-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                                    Add Bookmark
                                </h2>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    className="w-8 h-8 rounded-lg bg-background-lighter hover:bg-background-light text-text-muted hover:text-text-primary transition-all flex items-center justify-center disabled:opacity-50"
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
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Title input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-2">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="My awesome bookmark"
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 rounded-xl bg-background-lighter border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50"
                                    />
                                </div>

                                {/* URL input */}
                                <div>
                                    <label htmlFor="url" className="block text-sm font-medium text-text-secondary mb-2">
                                        URL
                                    </label>
                                    <input
                                        id="url"
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 rounded-xl bg-background-lighter border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50"
                                    />
                                </div>

                                {/* Error message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handleClose}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 rounded-xl bg-background-lighter hover:bg-background-light text-text-primary font-medium transition-all disabled:opacity-50"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium transition-all shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            'Add Bookmark'
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
