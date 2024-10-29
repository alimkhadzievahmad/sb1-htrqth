import React, { useState, useRef, useEffect } from 'react';
import { Upload, BarChart2, Activity, Type, Brain } from 'lucide-react';
import MethodSelector from './components/MethodSelector';
import TextInput from './components/TextInput';
import ResultsPanel from './components/ResultsPanel';
import { AnalysisMethod, AnalysisResults } from './types';

function App() {
  const [text, setText] = useState('');
  const [selectedMethods, setSelectedMethods] = useState<Set<AnalysisMethod>>(new Set());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const methods = [
    { id: 'frequency', label: 'Word Frequency', icon: BarChart2 },
    { id: 'entropy', label: 'Entropy Analysis', icon: Activity },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: Brain },
    { id: 'pos', label: 'POS Tagging', icon: Type },
  ];

  const handleAnalyze = async () => {
    if (!text || selectedMethods.size === 0) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newResults: AnalysisResults = {
        wordFrequency: selectedMethods.has('frequency') ? analyzeWordFrequency(text) : null,
        entropy: selectedMethods.has('entropy') ? analyzeEntropy(text) : null,
        sentiment: selectedMethods.has('sentiment') ? analyzeSentiment(text) : null,
        pos: selectedMethods.has('pos') ? analyzePOS(text) : null,
      };
      
      setResults(newResults);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Analysis functions
  const analyzeWordFrequency = (text: string) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach(word => freq[word] = (freq[word] || 0) + 1);
    return Object.entries(freq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  const analyzeEntropy = (text: string) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const segments = [];
    for (let i = 100; i <= words.length; i += 100) {
      const segment = words.slice(0, i);
      const freq: Record<string, number> = {};
      segment.forEach(word => freq[word] = (freq[word] || 0) + 1);
      const probs = Object.values(freq).map(f => f / segment.length);
      const entropy = -probs.reduce((sum, p) => sum + p * Math.log2(p), 0);
      segments.push({ words: i, entropy });
    }
    return segments;
  };

  const analyzeSentiment = (text: string) => {
    // Simplified sentiment analysis simulation
    return Math.random() * 2 - 1;
  };

  const analyzePOS = (text: string) => {
    return {
      Noun: Math.random() * 30 + 20,
      Verb: Math.random() * 20 + 15,
      Adjective: Math.random() * 15 + 10,
      Other: Math.random() * 25 + 15
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Text Analysis Suite</h1>
          <p className="text-lg text-gray-600">Analyze your text with advanced NLP techniques</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <MethodSelector
              methods={methods}
              selectedMethods={selectedMethods}
              onChange={setSelectedMethods}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text || selectedMethods.size === 0}
              className={`w-full mt-4 px-6 py-3 rounded-lg font-medium transition-all
                ${isAnalyzing || !text || selectedMethods.size === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
            </button>
          </div>

          <div className="lg:col-span-5">
            <TextInput
              value={text}
              onChange={setText}
              isAnalyzing={isAnalyzing}
            />
          </div>

          <div className="lg:col-span-4">
            <ResultsPanel
              results={results}
              selectedMethods={selectedMethods}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;