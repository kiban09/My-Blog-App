import { createSlice } from '@reduxjs/toolkit';
import { addBlog, softDeleteBlogThunk  } from './blogThunks';
import { fetchBlogsThunk } from './blogThunks';

interface BlogState {
  blogs: any[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const blogsPerPage = 5;

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(...action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(softDeleteBlogThunk.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      })
       .addCase(fetchBlogsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.totalPages = Math.ceil((action.payload.count || 0) / blogsPerPage);
      })
      .addCase(fetchBlogsThunk.rejected, (state, action) => {
        state.loading = false;
        state.blogs = [];
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
