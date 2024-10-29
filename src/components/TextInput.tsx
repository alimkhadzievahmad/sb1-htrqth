import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  value: string;
  onChange: (text: string) => void;
  isAnalyzing: boolean;
}

function TextInput({ value, onChange, isAnalyzing }: Props) {
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        onChange(text);
      }
    };
    reader.readAsText(file);
  }, [onChange]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all
          ${isAnalyzing
            ? 'border-gray-200 bg-gray-50'
            : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
          }`}
      >
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".txt"
          className="hidden"
          id="fileUpload"
          disabled={isAnalyzing}
        />
        <label
          htmlFor="fileUpload"
          className={`flex flex-col items-center gap-2
            ${isAnalyzing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <Upload className={`w-8 h-8 ${isAnalyzing ? 'text-gray-400' : 'text-blue-500'}`} />
          <span className={isAnalyzing ? 'text-gray-400' : 'text-gray-600'}>
            Drop text file here or click to upload
          </span>
        </label>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isAnalyzing}
        placeholder="Or paste your text here..."
        className={`w-full h-64 p-4 rounded-lg border transition-all resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${isAnalyzing
            ? 'bg-gray-50 border-gray-200 text-gray-400'
            : 'border-gray-200 hover:border-gray-300 focus:outline-none'
          }`}
      />
    </div>
  );
}

export default TextInput;