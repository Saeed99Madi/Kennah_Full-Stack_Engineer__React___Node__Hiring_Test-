import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./slices/tasksSlice";
// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    TaskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export { store };
