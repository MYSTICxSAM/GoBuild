import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

async function fetchBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  console.log('Fetched blogs:', data);
  return data;
}

async function postBlogs() {
  return 1;
}

export {fetchBlogs,postBlogs}