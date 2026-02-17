'use client';

import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl p-6"
                >
                    <div className="flex items-start gap-4">
                        {/* Favicon skeleton */}
                        <div className="w-12 h-12 rounded-xl bg-background-lighter animate-pulse" />

                        {/* Content skeleton */}
                        <div className="flex-1 space-y-3">
                            <div className="h-5 bg-background-lighter rounded animate-pulse w-3/4" />
                            <div className="h-4 bg-background-lighter rounded animate-pulse w-1/2" />
                            <div className="h-3 bg-background-lighter rounded animate-pulse w-1/3" />
                        </div>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </motion.div>
            ))}
        </div>
    );
}
