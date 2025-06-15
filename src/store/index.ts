import { configureStore } from '@reduxjs/toolkit';
import promptsReducer from './slices/promptsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 