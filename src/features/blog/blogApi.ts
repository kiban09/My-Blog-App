import { supabase } from '../../supabase/client';

export const insertBlog = async (blog: { title: string; content: string }) => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([blog])
    .select();

  if (error) throw error;
  return data;
};
