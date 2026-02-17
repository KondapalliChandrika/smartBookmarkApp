import { createClient } from '@/lib/supabase/client';
import type { Bookmark } from '@/types/bookmark';

export async function getBookmarks(): Promise<Bookmark[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bookmarks:', error);
        throw error;
    }

    return (data || []) as Bookmark[];
}

export async function createBookmark(title: string, url: string): Promise<Bookmark> {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('bookmarks')
        .insert([{
            user_id: user.id,
            title,
            url,
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating bookmark:', error);
        throw error;
    }

    return data as Bookmark;
}

export async function deleteBookmark(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting bookmark:', error);
        throw error;
    }
}
