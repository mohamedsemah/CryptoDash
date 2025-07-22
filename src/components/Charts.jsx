import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUpIcon } from 'lucide-react';
import { cardStyle } from '../styles/commonStyles';

const Charts = ({ cryptoData }) => {
  // Prepare data for charts
  const prepareChartData = () => {
    if (cryptoData.length === 0) return { pieData: [], topCoinsData: [] };

    // Market Cap Distribution Pie Chart
    const marketCapRanges = {
      'Large Cap (>$10B)': 0,
      'Mid Cap ($1B-$10B)': 0,
      'Small Cap ($100M-$1B)': 0,
      'Micro Cap (<$100M)': 0
    };

    cryptoData.forEach(coin => {
      const marketCap = coin.market_cap;
      if (marketCap >= 10e9) marketCapRanges['Large Cap (>$10B)']++;
      else if (marketCap >= 1e9) marketCapRanges['Mid Cap ($1B-$10B)']++;
      else if (marketCap >= 100e6) marketCapRanges['Small Cap ($100M-$1B)']++;
      else marketCapRanges['Micro Cap (<$100M)']++;
    });

    const pieData = Object.entries(marketCapRanges).map(([name, value]) => ({ name, value }));

    // Top 10 Coins by Market Cap for Bar Chart
    const topCoinsData = cryptoData
      .slice(0, 10)
      .map(coin => ({
        name: coin.symbol.toUpperCase(),
        marketCap: coin.market_cap / 1e9, // Convert to billions
        change24h: coin.price_change_percentage_24h
      }));

    return { pieData, topCoinsData };
  };

  const { pieData, topCoinsData } = prepareChartData();

  return (
    <div style={{display: 'flex', gap: '30px', marginBottom: '30px', flexWrap: 'wrap'}}>
      {/* Market Cap Distribution Pie Chart */}
      <div style={{
        ...cardStyle,
        flex: 1,
        minWidth: '400px',
        height: '400px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '20px',
          color: '#4ecdc4',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <BarChart3 size={20} />
          Market Cap Distribution
        </h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({name, value}) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb'][index % 4]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(26, 26, 46, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff'
              }}
            />
            <Legend
              wrapperStyle={{color: '#ffffff'}}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top 10 Coins by Market Cap Bar Chart */}
      <div style={{
        ...cardStyle,
        flex: 1,
        minWidth: '400px',
        height: '400px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '20px',
          color: '#4ecdc4',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <TrendingUpIcon size={20} />
          Top 10 Cryptocurrencies by Market Cap
        </h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={topCoinsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              stroke="#ffffff"
              fontSize={12}
            />
            <YAxis
              stroke="#ffffff"
              fontSize={12}
              label={{ value: 'Market Cap (Billions $)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#ffffff' } }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(26, 26, 46, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff'
              }}
              formatter={(value, name) => [
                name === 'marketCap' ? `$${value.toFixed(2)}B` : `${value.toFixed(2)}%`,
                name === 'marketCap' ? 'Market Cap' : '24h Change'
              ]}
            />
            <Bar
              dataKey="marketCap"
              fill="url(#marketCapGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="marketCapGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ecdc4" />
                <stop offset="100%" stopColor="#45b7d1" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;