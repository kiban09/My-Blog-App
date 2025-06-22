import { supabase } from '../../supabase/client';

export const insertBlog = async (blog: { title: string; content: string }) => {
  const { data: userData } = await supabase.auth.getUser();
  const user_id = userData?.user?.id;

  if (!user_id) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('blogs')
    .insert([{ ...blog, author_id: user_id }])
    .select();

  if (error) throw error;
  return data;
};
