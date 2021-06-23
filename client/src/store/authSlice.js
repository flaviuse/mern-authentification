import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, postLogin, postLogout } from "../api";

export const fetchUser = createAsyncThunk("user/fetchCurrent", async ({ rejectWithValue }) => {
  try {
    const response = await getUser();
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const login = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
  try {
    await postLogin(user);
    return user.username;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("user/logout", async ({ rejectWithValue }) => {
  try {
    await postLogout();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  isAuth: false,
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      return { ...state, status: "pending" };
    },
    [fetchUser.fulfilled]: (state, action) => {
      const user = action.payload;
      return { isAuth: true, user, status: "idle" };
    },
    [fetchUser.rejected]: (state, action) => {
      return initialState;
    },
    [login.pending]: (state, action) => {
      return { ...state, status: "pending" };
    },
    [login.fulfilled]: (state, action) => {
      const user = action.payload;
      return { isAuth: true, user, status: "idle" };
    },
    [login.rejected]: (state, action) => {
      return initialState;
    },
    [logout.pending]: (state, action) => {
      return { ...state, status: "pending" };
    },
    [logout.fulfilled]: (state, action) => {
      return initialState;
    },
    [login.rejected]: (state, action) => {
      return { ...state, status: "idle" };
    },
  },
});

export default authSlice.reducer;
