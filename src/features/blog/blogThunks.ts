import { createAsyncThunk } from '@reduxjs/toolkit';
import { insertBlog, editBlog  } from './blogApi';

export const addBlog = createAsyncThunk('blogs/add', async (blog: { title: string; content: string }) => {
  const result = await insertBlog(blog);
  return result;
});

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async (blog: { id: number; title: string; content: string }) => {
    const result = await editBlog(blog);
    return result;
  }
);
