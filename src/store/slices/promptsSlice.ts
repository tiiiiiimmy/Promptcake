import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Prompt {
  id: string;
  title: string;
  instructions: string;
  references: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface PromptsState {
  prompts: Prompt[];
  selectedPromptId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PromptsState = {
  prompts: [],
  selectedPromptId: null,
  loading: false,
  error: null,
};

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    setPrompts: (state, action: PayloadAction<Prompt[]>) => {
      state.prompts = action.payload;
    },
    addPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompts.push(action.payload);
    },
    updatePrompt: (state, action: PayloadAction<Prompt>) => {
      const index = state.prompts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.prompts[index] = action.payload;
      }
    },
    deletePrompt: (state, action: PayloadAction<string>) => {
      state.prompts = state.prompts.filter(p => p.id !== action.payload);
    },
    setSelectedPrompt: (state, action: PayloadAction<string | null>) => {
      state.selectedPromptId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPrompts,
  addPrompt,
  updatePrompt,
  deletePrompt,
  setSelectedPrompt,
  setLoading,
  setError,
} = promptsSlice.actions;

export default promptsSlice.reducer; 