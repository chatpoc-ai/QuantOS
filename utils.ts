import { BacktestResult, MarketData, RiskMetric, Strategy } from './types';

export const generateMockMarketData = (): MarketData[] => [
  { symbol: 'AAPL', price: 175.43, change: 1.25, volume: 45000000, timestamp: new Date() },
  { symbol: 'TSLA', price: 242.10, change: -3.40, volume: 89000000, timestamp: new Date() },
  { symbol: 'GOOGL', price: 138.90, change: 0.55, volume: 21000000, timestamp: new Date() },
  { symbol: 'NVDA', price: 460.15, change: 8.90, volume: 55000000, timestamp: new Date() },
  { symbol: 'AMZN', price: 129.30, change: -0.20, volume: 32000000, timestamp: new Date() },
  { symbol: 'MSFT', price: 335.60, change: 2.10, volume: 28000000, timestamp: new Date() },
];

export const generateMockStrategy = (name: string): Strategy => ({
  id: crypto.randomUUID(),
  name,
  code: `# ${name} Strategy\nimport backtrader as bt\n\nclass MyStrategy(bt.Strategy):\n    def next(self):\n        if self.data.close[0] > self.data.sma[0]:\n            self.buy()\n        elif self.data.close[0] < self.data.sma[0]:\n            self.sell()`,
  lastEdited: new Date(),
  tags: ['Momentum', 'Trend'],
});

export const generateEquityCurve = (days: number, startValue: number = 10000) => {
  let value = startValue;
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * 0.03; // Slight upward drift
    value = value * (1 + change);
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(2))
    });
  }
  return data;
};

export const generateCorrelationMatrix = (): RiskMetric[] => {
  const assets = ['AAPL', 'TSLA', 'GOOGL', 'NVDA', 'BTC'];
  return assets.map(asset => {
    const correlations: { [key: string]: number } = {};
    assets.forEach(other => {
      if (asset === other) correlations[other] = 1;
      else correlations[other] = parseFloat((Math.random() * 2 - 0.5).toFixed(2)); // Random -0.5 to 1
    });
    return { asset, correlations };
  });
};