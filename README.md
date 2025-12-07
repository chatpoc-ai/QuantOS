# QuantOS - AI-Powered Quantitative Trading Platform

QuantOS is a modern, cloud-native Proof of Concept (POC) for a quantitative trading platform. It integrates real-time market data visualization, an AI-assisted strategy development environment, and comprehensive risk management tools into a single, cohesive interface.

## 🚀 Key Features

### 1. **Interactive Dashboard**
The command center for market analysis and portfolio health.
- **Real-time Metrics**: Monitor Total P&L, Active Strategies, Portfolio Beta, and Value at Risk (VaR) at a glance.
- **Live Market Data**: Auto-updating table showing real-time price ticks, percentage changes, and volume for major assets (e.g., AAPL, TSLA, NVDA).
- **Search Filtering**: Filter the market data feed instantly using the global search bar.
- **Risk Visualization**: A D3.js-powered Correlation Matrix Heatmap to identify asset dependencies and diversify risk.

### 2. **AI Strategy Lab**
A code-first environment for developing trading algorithms, supercharged by Google Gemini.
- **Python Editor**: A robust code editor tailored for `backtrader` syntax with basic indentation support.
- **AI Architect**: Integrated generative AI assistant. Describe a strategy in plain English (e.g., "Buy when RSI < 30 and price is above 200 SMA"), and the AI generates the Python code automatically.
- **Strategy Management**: Save, edit, and tag strategies for rapid iteration.

### 3. **Backtesting Engine**
Simulate strategy performance against historical data before going live.
- **Performance KPIs**: Instant calculation of Sharpe Ratio, Total Return, Max Drawdown, and Win Rate.
- **Equity Curve**: Interactive area chart visualizing portfolio value over time.
- **Gemini Insight**: AI-powered analysis of your backtest results. The system reads the metrics and code to provide a textual risk assessment and suggestions for improvement (Strength/Weakness analysis).

### 4. **Risk & System Settings**
Configuration hub for platform governance.
- **Risk Controls**: Define hard limits for Max Drawdown, Position Sizing, and Daily Loss Limits to prevent catastrophic losses.
- **Notification Preferences**: Toggle alerts for Execution events and Risk Warnings.
- **Profile Management**: View account details and subscription status.

### 5. **System Notifications**
- **Real-time Alerts**: A notification center accessible via the bell icon to track order fills, risk alerts, and system updates.
- **Unread Status**: Visual indicators for new, unread messages.

## 🛠 Tech Stack

- **Frontend Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS (Dark Mode/Slate Theme)
- **Charting**: 
  - `Recharts` for time-series data (Equity curves).
  - `D3.js` for complex visualizations (Correlation Matrix).
- **AI Integration**: Google GenAI SDK (`@google/genai`) using the **Gemini 2.5 Flash** model.
- **Icons**: Lucide React.
- **Build**: Vite (implied by module usage).

## 📦 Data Models

The application manages several key data structures:
- **Strategy**: ID, Name, Python Code, Tags.
- **BacktestResult**: Sharpe Ratio, Equity Curve, Drawdown metrics.
- **MarketData**: Symbol, Price, Volume, Change %.
- **RiskMetric**: Asset correlations.

## 🤖 AI Capabilities

QuantOS leverages **Google Gemini 2.5 Flash** for two distinct tasks:
1.  **Code Generation**: Translating natural language descriptions into valid Python/Backtrader code.
2.  **Result Analysis**: interpreting statistical backtest results to provide human-readable feedback and risk warnings.

---

*Note: This is a Proof of Concept application. Market data and trade execution are currently simulated for demonstration purposes.*
