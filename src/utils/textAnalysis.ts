export const analyzeWordFrequency = (text: string) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq: Record<string, number> = {};
  words.forEach(word => freq[word] = (freq[word] || 0) + 1);
  return Object.entries(freq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
};

export const analyzeEntropy = (text: string) => {
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

export const analyzeSentiment = (text: string) => {
  // Simplified sentiment analysis simulation
  return Math.random() * 2 - 1;
};

export const analyzePOS = (text: string) => {
  return {
    Noun: Math.random() * 30 + 20,
    Verb: Math.random() * 20 + 15,
    Adjective: Math.random() * 15 + 10,
    Other: Math.random() * 25 + 15
  };
};