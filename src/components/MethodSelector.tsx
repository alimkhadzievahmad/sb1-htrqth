import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnalysisMethod } from '../types';

interface Method {
  id: AnalysisMethod;
  label: string;
  icon: LucideIcon;
}

interface Props {
  methods: Method[];
  selectedMethods: Set<AnalysisMethod>;
  onChange: (methods: Set<AnalysisMethod>) => void;
}

function MethodSelector({ methods, selectedMethods, onChange }: Props) {
  const toggleMethod = (method: AnalysisMethod) => {
    const newMethods = new Set(selectedMethods);
    if (newMethods.has(method)) {
      newMethods.delete(method);
    } else {
      newMethods.add(method);
    }
    onChange(newMethods);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Methods</h2>
      <div className="space-y-3">
        {methods.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            onClick={() => toggleMethod(id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
              ${selectedMethods.has(id)
                ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MethodSelector;