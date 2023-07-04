import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register new user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            const secretKey = localStorage.getItem("secretKey");
            const response = await authService.register(user, secretKey);
            if (response) {
                localStorage.setItem("user", JSON.stringify(response));
            }
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const secretKey = localStorage.getItem("secretKey");
        const response = await authService.login(user, secretKey);
        if (response) {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

// Update user balance
export const updateBalance = createAsyncThunk(
    "auth/balance",
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.updateBalance(userData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

// Upload user image
export const uploadImage = createAsyncThunk(
    "auth/uploadImage",
    async (formData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.uploadImage(formData, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );  

// Delete user
export const deleteUser = createAsyncThunk(
    "user/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.deleteUser(id, token);
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

// Transfer money
export const transfer = createAsyncThunk(
    "auth/transfer",
    async (transferData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.transfer(transferData, token);
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
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
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
                state.user = {
                    ...action.payload,
                    account: action.payload.account
                };
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = {
                    ...action.payload,
                    account:action.payload.account};
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(updateBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBalance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user.image = action.payload.image;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(transfer.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(transfer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
              })
              .addCase(transfer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              });          
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
