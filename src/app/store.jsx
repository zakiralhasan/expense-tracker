import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "../features/transaction/transactionSlice";
import { transactionsApi } from "../services/apiRTK";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    transaction: transactionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionsApi.middleware),
});

// setupListeners(store.dispatch);
