import React, { useState } from 'react';
import { Play, Save, Cpu, Sparkles, AlertCircle } from 'lucide-react';
import { Strategy } from '../types';
import { generateStrategyCode } from '../services/geminiService';

interface StrategyEditorProps {
  strategy: Strategy;
  onUpdateStrategy: (updated: Strategy) => void;
  onRunBacktest: () => void;
}

const StrategyEditor: React.FC<StrategyEditorProps> = ({ strategy, onUpdateStrategy, onRunBacktest }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError(null);
    try {
      const code = await generateStrategyCode(prompt);
      onUpdateStrategy({ ...strategy, code });
    } catch (e) {
      setError("Failed to generate strategy. Please check your API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = strategy.code.substring(0, start) + "    " + strategy.code.substring(end);
      onUpdateStrategy({ ...strategy, code: newCode });
      // Restore cursor position - simple timeout needed for React re-render
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 p-4 animate-fade-in text-sm">
      {/* Editor Column */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[calc(100vh-140px)]">
          {/* Toolbar */}
          <div className="p-3 border-b border-slate-700 flex justify-between items-center bg-slate-900/50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <span className="bg-slate-700 px-2 py-1 rounded text-xs text-slate-300 font-mono">strategy.py</span>
              <span className="text-xs text-slate-500">Python 3.10</span>
            </div>
            <div className="flex gap-2">
              <button 
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                onClick={() => console.log('Saved')}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button 
                onClick={onRunBacktest}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4" />
                Backtest
              </button>
            </div>
          </div>
          
          {/* Code Area */}
          <textarea 
            className="flex-1 bg-slate-850 text-slate-300 font-mono p-4 resize-none focus:outline-none text-sm leading-6"
            spellCheck="false"
            value={strategy.code}
            onChange={(e) => onUpdateStrategy({...strategy, code: e.target.value})}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* AI Assistant Column */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 h-auto md:h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-semibold">AI Architect</h2>
          </div>
          
          <p className="text-slate-400 text-xs mb-4">
            Describe a trading strategy in plain English, and I will generate the Python code for you.
          </p>

          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:border-purple-500 focus:outline-none resize-none mb-3"
            rows={6}
            placeholder="e.g., Create a strategy that buys when the 20-day SMA crosses above the 50-day SMA and sells when it crosses below..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {error && (
            <div className="mb-3 p-2 bg-rose-500/10 border border-rose-500/20 rounded text-xs text-rose-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            {isGenerating ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Code
              </>
            )}
          </button>
          
          <div className="mt-auto pt-4 border-t border-slate-700">
             <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Capabilities</h4>
             <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                <li>Momentum Strategies</li>
                <li>Mean Reversion</li>
                <li>Statistical Arbitrage</li>
                <li>Risk Management Rules</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyEditor;