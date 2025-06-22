import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from './authAPI';

interface AuthState {
  user: any | null;
  profile: {
    full_name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  loading: false,
  error: null,
};

// Async thunk for registering user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await authAPI.signUp(email, password);
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data.user;
  }
);

// Async thunk for logging in user
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await authAPI.signIn(email, password);
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data.user;
  }
);

// Async thunk for logging out user
export const signOutUser = createAsyncThunk('auth/signOutUser', async (_, thunkAPI) => {
  const { error } = await authAPI.signOut();
  if (error) return thunkAPI.rejectWithValue(error.message);
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserProfile(state, action) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setUserProfile, clearProfile, clearError } = authSlice.actions;
export default authSlice.reducer;