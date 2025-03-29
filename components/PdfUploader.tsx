'use client';

import { analyzePdf } from '@/app/store/pdfSlice';
import { AppDispatch, RootState } from '@/app/store/store';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PdfUploader: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { result, loading, error } = useSelector(
    (state: RootState) => state.pdf
  );
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleSubmit() {
    if (file) {
      dispatch(analyzePdf(file));
    }
  }

  return (
    <div>
      <h1>Upload PDF File</h1>
      <input type='file' accept='application/pdf' onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={!file || loading}>
        {loading ? 'Analyzing...' : 'Analyze PDF'}
      </button>
      {error && <p>{error}</p>}
      {result && (
        <div>
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
