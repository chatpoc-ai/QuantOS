import React, { useEffect, useState } from 'react';
import { Strategy, BacktestResult } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { analyzeBacktestResults } from '../services/geminiService';
import { Activity, Brain, CheckCircle, AlertTriangle } from 'lucide-react';

interface BacktestProps {
  strategy: Strategy;
  results: BacktestResult;
}

const Backtest: React.FC<BacktestProps> = ({ strategy, results }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    // Automatically trigger analysis when results change
    const fetchAnalysis = async () => {
      setLoadingAnalysis(true);
      const metricsSummary = `Sharpe: ${results.sharpeRatio}, MaxDD: ${results.maxDrawdown}%, Return: ${results.totalReturn}%`;
      const text = await analyzeBacktestResults(metricsSummary, strategy.code);
      setAnalysis(text);
      setLoadingAnalysis(false);
    };
    
    fetchAnalysis();
  }, [results, strategy.code]);

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-white">Backtest Report</h1>
           <p className="text-slate-400 text-sm font-mono">{results.strategyId} • Last Run: Just now</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
             Data: 2023-01-01 to 2023-12-31
           </span>
           <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
             Asset: AAPL
           </span>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-xs uppercase font-bold">Total Return</p>
           <p className={`text-2xl font-mono mt-1 ${results.totalReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
             {results.totalReturn > 0 ? '+' : ''}{results.totalReturn}%
           </p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-xs uppercase font-bold">Sharpe Ratio</p>
           <p className="text-2xl font-mono mt-1 text-blue-400">{results.sharpeRatio}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-xs uppercase font-bold">Max Drawdown</p>
           <p className="text-2xl font-mono mt-1 text-rose-400">{results.maxDrawdown}%</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-xs uppercase font-bold">Win Rate</p>
           <p className="text-2xl font-mono mt-1 text-amber-400">{results.winRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-4 rounded-xl border border-slate-700 min-h-[400px]">
           <h3 className="text-sm font-bold text-slate-300 mb-4">Cumulative Equity</h3>
           <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.equityCurve}>
                    <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" tickFormatter={(v) => v.slice(5)} />
                    <YAxis stroke="#64748b" domain={['dataMin', 'dataMax']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#colorEquity)" />
                </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* AI Analysis Panel */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Brain className="w-5 h-5" />
            <h3 className="font-bold">Gemini Insight</h3>
          </div>
          
          <div className="flex-1 bg-slate-900/50 rounded-lg p-4 text-sm text-slate-300 leading-relaxed border border-slate-700/50">
            {loadingAnalysis ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 opacity-70">
                    <Activity className="w-6 h-6 animate-pulse text-purple-500" />
                    <p>Analyzing performance metrics...</p>
                </div>
            ) : analysis ? (
                <div className="prose prose-invert prose-sm">
                    <p>{analysis}</p>
                </div>
            ) : (
                <p className="text-slate-500 italic">No analysis available. Check API settings.</p>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">STRENGTH</span>
                </div>
                <p className="text-xs text-slate-400">Consistent returns in trending markets.</p>
            </div>
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-rose-400 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold">WEAKNESS</span>
                </div>
                <p className="text-xs text-slate-400">High drawdown during volatility.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backtest;