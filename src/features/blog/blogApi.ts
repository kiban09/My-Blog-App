import { supabase } from '../../supabase/client';

const blogsPerPage = 5;

export const getBlogs = async (page: number, user_id: string) => {
  const start = (page - 1) * blogsPerPage;
  const end = start + blogsPerPage - 1;

  const { data, count, error } = await supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .eq('author_id', user_id)
    .eq('is_deleted', false)
    .order('updated_at', { ascending: false })
    .range(start, end);

  if (error) throw new Error(error.message);
  return { data, count };
};

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

export const editBlog = async (blog: { id: number; title: string; content: string }) => {
  const { data, error } = await supabase
    .from('blogs')
    .update({
      title: blog.title,
      content: blog.content,
    })
    .eq('id', blog.id)
    .select();

  if (error) throw error;
  return data;
};

export const softDeleteBlog = async (id: number) => {
  const { error } = await supabase
    .from('blogs')
    .update({ is_deleted: true })
    .eq('id', id);

  if (error) throw error;
};
