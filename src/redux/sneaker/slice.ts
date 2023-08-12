import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSneakers } from './asyncActions';
import { Sneaker, SneakerSliceState, Status } from './types';

const initialState: SneakerSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const sneakerSlice = createSlice({
  name: 'sneaker',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Sneaker[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchSneakers.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = sneakerSlice.actions;

export default sneakerSlice.reducer;
