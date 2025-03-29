import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PdfAnalysisState {
  result: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PdfAnalysisState = {
  result: null,
  loading: false,
  error: null,
};

export const analyzePdf = createAsyncThunk(
  'pdf/analyzePdf',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'http://localhost:8080/api/analyze-pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to analyze PDF!');
    }
  }
);

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(analyzePdf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzePdf.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(analyzePdf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pdfSlice.reducer;
