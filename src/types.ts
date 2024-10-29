export type AnalysisMethod = 'frequency' | 'entropy' | 'sentiment' | 'pos';

export interface AnalysisResults {
  wordFrequency: [string, number][] | null;
  entropy: { words: number; entropy: number; }[] | null;
  sentiment: number | null;
  pos: Record<string, number> | null;
}