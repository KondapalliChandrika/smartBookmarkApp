import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function DashboardLoading() {
    return (
        <div className="min-h-screen">
            {/* Navbar skeleton */}
            <div className="glass border-b border-white/10 h-16" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header skeleton */}
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-background-lighter rounded animate-pulse" />
                        <div className="h-4 w-32 bg-background-lighter rounded animate-pulse" />
                    </div>
                    <div className="h-12 w-40 bg-background-lighter rounded-xl animate-pulse" />
                </div>

                {/* Bookmarks skeleton */}
                <LoadingSkeleton />
            </main>
        </div>
    );
}
