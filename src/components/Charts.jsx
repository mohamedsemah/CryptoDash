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

    const pieData = Object.entries(marketCapRanges)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0); // Only include categories with data

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

  // Custom label function for better positioning and readability
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, value }) => {
    // Only show labels for segments that are at least 5% to avoid overcrowding
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4; // Position labels outside the pie
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
        stroke="rgba(0,0,0,0.8)"
        strokeWidth="0.5"
      >
        {`${name}: ${value}`}
      </text>
    );
  };

  // Color palette for pie chart
  const pieColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb', '#43e97b'];

  return (
    <div style={{display: 'flex', gap: '30px', marginBottom: '30px', flexWrap: 'wrap'}}>
      {/* Market Cap Distribution Pie Chart */}
      <div style={{
        ...cardStyle,
        flex: 1,
        minWidth: '400px',
        height: '450px' // Increased height for better label spacing
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

        {/* Legend - Manual implementation for better control */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '20px',
          justifyContent: 'center'
        }}>
          {pieData.map((entry, index) => (
            <div key={entry.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: `2px solid ${pieColors[index % pieColors.length]}`,
              fontSize: '12px',
              fontWeight: '600',
              color: '#ffffff'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: pieColors[index % pieColors.length]
              }}></div>
              <span>{entry.name}: {entry.value}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height="70%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              innerRadius={30} // Create donut chart for better label positioning
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2} // Add small gaps between segments
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(26, 26, 46, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600'
              }}
              formatter={(value, name) => [
                `${value} coins`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top 10 Coins by Market Cap Bar Chart */}
      <div style={{
        ...cardStyle,
        flex: 1,
        minWidth: '400px',
        height: '450px'
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
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#ffffff"
              fontSize={12}
              label={{
                value: 'Market Cap (Billions $)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#ffffff' }
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(26, 26, 46, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600'
              }}
              formatter={(value, name) => [
                `$${value.toFixed(2)}B`,
                'Market Cap'
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar
              dataKey="marketCap"
              fill="url(#marketCapGradient)"
              radius={[4, 4, 0, 0]}
              stroke="rgba(78, 205, 196, 0.3)"
              strokeWidth={1}
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