import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isTracked: false,
  trackedCoins: [],
  boughtCoins: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//  Register user

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Authorize user

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//  Logout user

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Track coin

export const trackCoin = createAsyncThunk(
  "auth/track",
  async (coinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.trackCoin({ coinId: coinData.coinId }, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Buy coin

export const buyCoin = createAsyncThunk(
  "auth/buy",
  async (coinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.buyCoin(
        {
          coinId: coinData.coinId,
          priceBought: coinData.priceBought,
          amount: coinData.amount,
        },
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete tracked coin

export const deleteTrackedCoin = createAsyncThunk(
  "auth/deleteTracked",
  async (coinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.deleteTrackedCoin(
        { coinId: coinData.coinId },
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get tracked coins

export const getTrackedCoins = createAsyncThunk(
  "auth/getTracked",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getTrackedCoins(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get bought coins

export const getBoughtCoins = createAsyncThunk(
  "auth/getBought",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getBoughtCoins(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Check tracked coin

export const checkTrackedCoin = createAsyncThunk(
  "auth/checkTracked",
  async (coinId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.checkTrackedCoin(coinId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete bought coin

export const deleteBoughtCoin = createAsyncThunk(
  "auth/deleteBought",
  async (coinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.deleteBoughtCoin(
        { coinId: coinData.coinId },
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(trackCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trackedCoins.push(action.payload);
      })
      .addCase(deleteTrackedCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trackedCoins = state.trackedCoins.filter(
          (coin) => coin.coinId !== action.payload.coinId
        );
      })
      .addCase(getTrackedCoins.fulfilled, (state, action) => {
        state.trackedCoins = action.payload;
      })
      .addCase(checkTrackedCoin.fulfilled, (state, action) => {
        state.isTracked = action.payload;
      })
      .addCase(getBoughtCoins.fulfilled, (state, action) => {
        state.boughtCoins = action.payload;
      })
      .addCase(deleteBoughtCoin.fulfilled, (state, action) => [
        (state.boughtCoins = state.boughtCoins.filter(
          (coin) => coin.coinId !== action.payload.coinId
        )),
      ]);
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
