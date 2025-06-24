import { createAsyncThunk } from '@reduxjs/toolkit';
import { insertBlog, editBlog, softDeleteBlog   } from './blogApi';
import { getBlogs } from './blogApi';
import { supabase } from '../../supabase/client';

export const addBlog = createAsyncThunk(
  'blogs/add', 
  async (blog: { title: string; content: string }) => {
    const result = await insertBlog(blog);
    return result;
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async (blog: { id: number; title: string; content: string }) => {
    const result = await editBlog(blog);
    return result;
  }
);

export const fetchBlogsThunk = createAsyncThunk(
  'blogs/fetch',
  async (page: number, { rejectWithValue }) => {
    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData?.user?.id;

    if (!user_id) return rejectWithValue('User not logged in');

    try {
      const { data, count } = await getBlogs(page, user_id);
      return { data, count };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const softDeleteBlogThunk = createAsyncThunk(
  'blogs/softDelete',
  async (id: number) => {
    await softDeleteBlog(id);
    return id;
  }
);
