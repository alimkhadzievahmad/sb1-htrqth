import React from 'react';
import { BarChart2, Activity, Brain, Type } from 'lucide-react';
import { AnalysisMethod, AnalysisResults } from '../types';
import WordFrequencyChart from './charts/WordFrequencyChart';
import EntropyChart from './charts/EntropyChart';
import POSChart from './charts/POSChart';

interface Props {
  results: AnalysisResults | null;
  selectedMethods: Set<AnalysisMethod>;
  isAnalyzing: boolean;
}

function ResultsPanel({ results, selectedMethods, isAnalyzing }: Props) {
  if (!selectedMethods.size) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
        <p>Select analysis methods to begin</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>

      {isAnalyzing ? (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: selectedMethods.size }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : results ? (
        <>
          {selectedMethods.has('frequency') && results.wordFrequency && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <BarChart2 className="w-5 h-5" />
                <h3 className="font-medium">Word Frequency</h3>
              </div>
              <div className="h-64">
                <WordFrequencyChart data={results.wordFrequency} />
              </div>
            </div>
          )}

          {selectedMethods.has('entropy') && results.entropy && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Activity className="w-5 h-5" />
                <h3 className="font-medium">Entropy Analysis</h3>
              </div>
              <div className="h-64">
                <EntropyChart data={results.entropy} />
              </div>
            </div>
          )}

          {selectedMethods.has('sentiment') && results.sentiment !== null && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Brain className="w-5 h-5" />
                <h3 className="font-medium">Sentiment Score</h3>
              </div>
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 bottom-0 transition-all ${
                    results.sentiment > 0 ? 'right-1/2 bg-green-500' : 'left-1/2 bg-red-500'
                  }`}
                  style={{
                    width: `${Math.abs(results.sentiment) * 50}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  {results.sentiment.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {selectedMethods.has('pos') && results.pos && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Type className="w-5 h-5" />
                <h3 className="font-medium">Parts of Speech</h3>
              </div>
              <div className="h-64">
                <POSChart data={results.pos} />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p>Click "Start Analysis" to begin</p>
        </div>
      )}
    </div>
  );
}

export default ResultsPanel;