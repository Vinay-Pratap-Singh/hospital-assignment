import { createSlice } from "@reduxjs/toolkit";

interface Istate {
  isLoading: boolean;
}

const initialState: Istate = {
  isLoading: false,
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default hospitalSlice.reducer;
