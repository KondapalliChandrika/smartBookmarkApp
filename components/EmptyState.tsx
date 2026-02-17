'use client';

import { motion } from 'framer-motion';

export default function EmptyState({ onAddClick }: { onAddClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4"
        >
            {/* Illustration */}
            <div className="relative mb-8">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-white/10"
                >
                    <svg
                        className="w-16 h-16 text-primary-light"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                </motion.div>

                {/* Floating particles */}
                <motion.div
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/30 blur-xl"
                />
                <motion.div
                    animate={{
                        y: [10, -10, 10],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                    className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-secondary/30 blur-xl"
                />
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-text-primary mb-2">
                No bookmarks yet
            </h3>
            <p className="text-text-muted text-center max-w-md mb-8">
                Start building your collection by adding your first bookmark. Keep all your favorite links organized in one place.
            </p>

            {/* CTA Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddClick}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium transition-all shadow-lg hover:shadow-primary/50 flex items-center gap-2"
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
                Add Your First Bookmark
            </motion.button>
        </motion.div>
    );
}
