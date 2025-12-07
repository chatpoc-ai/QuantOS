export interface Strategy {
  id: string;
  name: string;
  code: string;
  lastEdited: Date;
  tags: string[];
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  timestamp: Date;
}

export interface BacktestResult {
  strategyId: string;
  sharpeRatio: number;
  totalReturn: number;
  maxDrawdown: number;
  winRate: number;
  equityCurve: { date: string; value: number }[];
  trades: Trade[];
}

export interface Trade {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  timestamp: string;
}

export interface RiskMetric {
  asset: string;
  correlations: { [key: string]: number };
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  STRATEGY = 'STRATEGY',
  BACKTEST = 'BACKTEST',
  MARKET = 'MARKET',
  SETTINGS = 'SETTINGS'
}