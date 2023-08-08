import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  editing: {}
};

//**************  create slice   *****************
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload
    },
    editInactive: (state) => {
      state.editing = {}
    }
  },
});
export const { editActive, editInactive } = transactionSlice.actions;
export default transactionSlice.reducer;
