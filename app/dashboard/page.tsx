import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import type { User } from '@/types/bookmark';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch initial bookmarks on the server using server client
    const { data: initialBookmarks, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bookmarks:', error);
    }

    return (
        <DashboardClient
            user={user as User}
            initialBookmarks={initialBookmarks || []}
        />
    );
}
