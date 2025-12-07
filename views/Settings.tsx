import React from 'react';
import { Save, Shield, Bell, User } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-4 space-y-6 animate-fade-in max-w-5xl mx-auto">
      <header className="mb-6 border-b border-slate-700 pb-4">
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-slate-400">Manage platform configuration and risk parameters</p>
      </header>

      {/* Account Section */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4 text-blue-400">
            <User className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-slate-200">Account & Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Display Name</label>
            <input type="text" defaultValue="Quant Analyst" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input type="email" defaultValue="analyst@quantos.fi" disabled className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed" />
          </div>
        </div>
      </section>

      {/* Risk Management Section */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4 text-rose-400">
            <Shield className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-slate-200">Risk Controls</h2>
        </div>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Max Drawdown Limit (%)</label>
                <div className="flex items-center gap-4">
                    <input type="range" min="1" max="20" defaultValue="5" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                    <span className="text-slate-200 font-mono w-12 text-right bg-slate-900 px-2 py-1 rounded border border-slate-700">5%</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Trading will automatically halt if portfolio drawdown exceeds this value within a 24h period.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Max Position Size ($)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <input type="number" defaultValue="50000" className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-6 pr-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Daily Loss Limit ($)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <input type="number" defaultValue="2000" className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-6 pr-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4 text-amber-400">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-slate-200">Notifications</h2>
        </div>
        <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div>
                    <p className="text-sm font-medium text-slate-200">Execution Alerts</p>
                    <p className="text-xs text-slate-500">Notify when orders are filled or rejected</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div>
                    <p className="text-sm font-medium text-slate-200">Risk Warnings</p>
                    <p className="text-xs text-slate-500">Alert when risk limits are approached</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-emerald-500/20">
            <Save className="w-4 h-4" />
            Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsView;