import { createAsyncThunk } from '@reduxjs/toolkit';
import { insertBlog } from './blogApi';

export const addBlog = createAsyncThunk('blogs/add', async (blog: { title: string; content: string }) => {
  const result = await insertBlog(blog);
  return result;
});
