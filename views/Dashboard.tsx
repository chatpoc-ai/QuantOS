import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MarketData, Strategy, BacktestResult, RiskMetric } from '../types';
import RiskCorrelation from '../components/RiskCorrelation';
import { Activity, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

interface DashboardProps {
  marketData: MarketData[];
  recentResults: BacktestResult | null;
  riskData: RiskMetric[];
}

const Dashboard: React.FC<DashboardProps> = ({ marketData, recentResults, riskData }) => {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Market Overview</h1>
        <p className="text-slate-400">Real-time exposure and system health</p>
      </header>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Total P&L (YTD)</p>
              <h3 className="text-2xl font-bold text-emerald-400">+$24,592.30</h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-2">+12.5% from last month</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Active Strategies</p>
              <h3 className="text-2xl font-bold text-white">3</h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">12 orders pending</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Portfolio Beta</p>
              <h3 className="text-2xl font-bold text-white">0.85</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Moderate Market Correlation</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Value at Risk (95%)</p>
              <h3 className="text-2xl font-bold text-rose-400">$1,250</h3>
            </div>
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Daily VaR</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Live Market Table */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold text-slate-200">Live Market Data</h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Feed Connected
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-900/50 text-xs uppercase font-medium">
                <tr>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Change</th>
                  <th className="px-4 py-3 text-right">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {marketData.map((tick) => (
                  <tr key={tick.symbol} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{tick.symbol}</td>
                    <td className="px-4 py-3 text-right">${tick.price.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right ${tick.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tick.change >= 0 ? '+' : ''}{tick.change}%
                    </td>
                    <td className="px-4 py-3 text-right">{(tick.volume / 1000000).toFixed(1)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Risk Visualization */}
        <div className="lg:col-span-1">
           <RiskCorrelation data={riskData} />
        </div>
      </div>

      {/* Equity Curve (If a backtest exists) */}
      {recentResults && (
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="font-semibold text-slate-200 mb-4">Latest Backtest Equity Curve</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recentResults.equityCurve}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" hide />
                <YAxis domain={['auto', 'auto']} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;