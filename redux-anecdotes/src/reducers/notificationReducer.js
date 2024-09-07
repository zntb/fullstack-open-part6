import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const setNotificationAsync = createAsyncThunk(
  'notifications/setNotificationAsync',
  async ({ message, duration }, { dispatch, getState }) => {
    const { timeoutId } = getState().notifications;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);

    return { message, timeoutId: newTimeoutId };
  },
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    message: null,
    timeoutId: null,
  },
  reducers: {
    clearNotification(state) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      state.message = null;
      state.timeoutId = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(setNotificationAsync.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.timeoutId = action.payload.timeoutId;
    });
  },
});

export const { clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
