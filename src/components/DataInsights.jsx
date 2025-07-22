import React from 'react';
import { TrendingUp, TrendingDown, Info, AlertCircle, Target, Zap } from 'lucide-react';
import { cardStyle, formatPrice, formatMarketCap } from '../styles/commonStyles';

const DataInsights = ({ cryptoData, stats }) => {
  // Generate market insights
  const generateInsights = () => {
    if (cryptoData.length === 0) return {};

    const prices = cryptoData.map(coin => coin.current_price);
    const changes = cryptoData.map(coin => coin.price_change_percentage_24h);
    const marketCaps = cryptoData.map(coin => coin.market_cap);

    // Calculate market metrics
    const gainers = cryptoData.filter(coin => coin.price_change_percentage_24h > 0);
    const losers = cryptoData.filter(coin => coin.price_change_percentage_24h < 0);
    const bigMovers = cryptoData.filter(coin => Math.abs(coin.price_change_percentage_24h) > 10);

    const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const topGainer = cryptoData.reduce((max, coin) =>
      coin.price_change_percentage_24h > max.price_change_percentage_24h ? coin : max
    );
    const topLoser = cryptoData.reduce((min, coin) =>
      coin.price_change_percentage_24h < min.price_change_percentage_24h ? coin : min
    );

    // Market sentiment analysis
    const bullishSentiment = (gainers.length / cryptoData.length) * 100;
    const volatility = bigMovers.length / cryptoData.length * 100;

    // Price distribution analysis
    const underDollar = cryptoData.filter(coin => coin.current_price < 1).length;
    const over1000 = cryptoData.filter(coin => coin.current_price > 1000).length;

    // Market cap distribution
    const largeCaps = cryptoData.filter(coin => coin.market_cap >= 10e9).length;
    const midCaps = cryptoData.filter(coin => coin.market_cap >= 1e9 && coin.market_cap < 10e9).length;
    const smallCaps = cryptoData.filter(coin => coin.market_cap >= 100e6 && coin.market_cap < 1e9).length;

    return {
      avgChange,
      topGainer,
      topLoser,
      bullishSentiment,
      volatility,
      gainers: gainers.length,
      losers: losers.length,
      bigMovers: bigMovers.length,
      underDollar,
      over1000,
      largeCaps,
      midCaps,
      smallCaps,
      totalVolume: cryptoData.reduce((sum, coin) => sum + coin.total_volume, 0)
    };
  };

  const insights = generateInsights();

  const getMarketSentiment = () => {
    if (insights.bullishSentiment > 70) return { text: "Extremely Bullish", color: "#43e97b", emoji: "🚀" };
    if (insights.bullishSentiment > 55) return { text: "Bullish", color: "#4ecdc4", emoji: "📈" };
    if (insights.bullishSentiment > 45) return { text: "Neutral", color: "#f093fb", emoji: "⚖️" };
    if (insights.bullishSentiment > 30) return { text: "Bearish", color: "#ff6b6b", emoji: "📉" };
    return { text: "Extremely Bearish", color: "#ee5a6f", emoji: "💥" };
  };

  const getVolatilityLevel = () => {
    if (insights.volatility > 40) return { text: "Very High", color: "#ff6b6b", emoji: "⚡" };
    if (insights.volatility > 25) return { text: "High", color: "#f093fb", emoji: "🌊" };
    if (insights.volatility > 15) return { text: "Moderate", color: "#4ecdc4", emoji: "📊" };
    return { text: "Low", color: "#43e97b", emoji: "😴" };
  };

  const sentiment = getMarketSentiment();
  const volatility = getVolatilityLevel();

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '25px'
      }}>
        <Info size={24} style={{color: '#4ecdc4'}} />
        <h3 style={{
          fontSize: '22px',
          fontWeight: '800',
          margin: 0,
          background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Market Intelligence & Data Insights
        </h3>
      </div>

      {/* Market Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '25px'
      }}>
        {/* Market Sentiment */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${sentiment.color}40`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px'
          }}>
            <span style={{fontSize: '20px'}}>{sentiment.emoji}</span>
            <h4 style={{fontSize: '16px', fontWeight: '700', color: sentiment.color, margin: 0}}>
              Market Sentiment
            </h4>
          </div>
          <p style={{fontSize: '24px', fontWeight: '800', color: sentiment.color, margin: '0 0 8px 0'}}>
            {sentiment.text}
          </p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0}}>
            {insights.bullishSentiment.toFixed(1)}% of coins are gaining today ({insights.gainers} gainers vs {insights.losers} losers)
          </p>
        </div>

        {/* Market Volatility */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${volatility.color}40`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px'
          }}>
            <span style={{fontSize: '20px'}}>{volatility.emoji}</span>
            <h4 style={{fontSize: '16px', fontWeight: '700', color: volatility.color, margin: 0}}>
              Market Volatility
            </h4>
          </div>
          <p style={{fontSize: '24px', fontWeight: '800', color: volatility.color, margin: '0 0 8px 0'}}>
            {volatility.text}
          </p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0}}>
            {insights.bigMovers} coins moved ±10% or more ({insights.volatility.toFixed(1)}% of market)
          </p>
        </div>

        {/* Average Performance */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${insights.avgChange >= 0 ? '#43e97b' : '#ff6b6b'}40`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px'
          }}>
            {insights.avgChange >= 0 ?
              <TrendingUp size={20} style={{color: '#43e97b'}} /> :
              <TrendingDown size={20} style={{color: '#ff6b6b'}} />
            }
            <h4 style={{fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: 0}}>
              Market Average
            </h4>
          </div>
          <p style={{
            fontSize: '24px',
            fontWeight: '800',
            color: insights.avgChange >= 0 ? '#43e97b' : '#ff6b6b',
            margin: '0 0 8px 0'
          }}>
            {insights.avgChange >= 0 ? '+' : ''}{insights.avgChange.toFixed(2)}%
          </p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0}}>
            Average 24h change across all {stats.total} cryptocurrencies
          </p>
        </div>
      </div>

      {/* Top Performers */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '25px',
        flexWrap: 'wrap'
      }}>
        {/* Top Gainer */}
        <div style={{
          flex: 1,
          minWidth: '250px',
          background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(67, 233, 123, 0.05) 100%)',
          borderRadius: '12px',
          padding: '18px',
          border: '1px solid rgba(67, 233, 123, 0.2)'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <img
              src={insights.topGainer?.image}
              alt={insights.topGainer?.name}
              style={{width: '32px', height: '32px', borderRadius: '50%'}}
            />
            <div>
              <h4 style={{fontSize: '14px', fontWeight: '700', color: '#43e97b', margin: 0}}>
                🏆 Top Gainer
              </h4>
              <p style={{fontSize: '16px', fontWeight: '600', color: '#ffffff', margin: 0}}>
                {insights.topGainer?.name}
              </p>
            </div>
          </div>
          <p style={{fontSize: '20px', fontWeight: '800', color: '#43e97b', margin: 0}}>
            +{insights.topGainer?.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        {/* Top Loser */}
        <div style={{
          flex: 1,
          minWidth: '250px',
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 107, 107, 0.05) 100%)',
          borderRadius: '12px',
          padding: '18px',
          border: '1px solid rgba(255, 107, 107, 0.2)'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
            <img
              src={insights.topLoser?.image}
              alt={insights.topLoser?.name}
              style={{width: '32px', height: '32px', borderRadius: '50%'}}
            />
            <div>
              <h4 style={{fontSize: '14px', fontWeight: '700', color: '#ff6b6b', margin: 0}}>
                📉 Top Loser
              </h4>
              <p style={{fontSize: '16px', fontWeight: '600', color: '#ffffff', margin: 0}}>
                {insights.topLoser?.name}
              </p>
            </div>
          </div>
          <p style={{fontSize: '20px', fontWeight: '800', color: '#ff6b6b', margin: 0}}>
            {insights.topLoser?.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Market Composition Analysis */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#4ecdc4',
          margin: '0 0 15px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Target size={18} />
          Market Composition Breakdown
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          fontSize: '13px'
        }}>
          <div>
            <p style={{color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0', fontWeight: '500'}}>By Market Cap:</p>
            <p style={{color: '#ffffff', margin: 0}}>
              🦣 {insights.largeCaps} Large Cap • 🐘 {insights.midCaps} Mid Cap • 🐎 {insights.smallCaps} Small Cap
            </p>
          </div>

          <div>
            <p style={{color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0', fontWeight: '500'}}>By Price Range:</p>
            <p style={{color: '#ffffff', margin: 0}}>
              💰 {insights.underDollar} under $1 • 💎 {insights.over1000} over $1,000
            </p>
          </div>

          <div>
            <p style={{color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 0', fontWeight: '500'}}>Total Volume:</p>
            <p style={{color: '#ffffff', margin: 0, fontWeight: '600'}}>
              {formatMarketCap(insights.totalVolume)} (24h trading)
            </p>
          </div>
        </div>

        {/* Data Interpretation Guide */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(78, 205, 196, 0.08)',
          borderRadius: '8px',
          border: '1px solid rgba(78, 205, 196, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <AlertCircle size={16} style={{color: '#4ecdc4'}} />
            <h5 style={{fontSize: '14px', fontWeight: '700', color: '#4ecdc4', margin: 0}}>
              💡 How to Read This Data
            </h5>
          </div>
          <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5'}}>
            <p style={{margin: '0 0 8px 0'}}>
              <strong>Market Sentiment:</strong> Bullish markets (70%+ gainers) suggest positive momentum, while bearish markets indicate selling pressure.
            </p>
            <p style={{margin: '0 0 8px 0'}}>
              <strong>Volatility:</strong> High volatility (25%+ big movers) creates opportunities but increases risk. Low volatility suggests market stability.
            </p>
            <p style={{margin: 0}}>
              <strong>Market Cap Distribution:</strong> Large caps offer stability, mid caps balance growth/risk, small caps provide high growth potential with higher risk.
            </p>
          </div>
        </div>
      </div>

      {/* Chart Annotations */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(240, 147, 251, 0.08)',
        borderRadius: '12px',
        border: '1px solid rgba(240, 147, 251, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <Zap size={16} style={{color: '#f093fb'}} />
          <h5 style={{fontSize: '14px', fontWeight: '700', color: '#f093fb', margin: 0}}>
            📊 Chart Analysis Guide
          </h5>
        </div>
        <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4'}}>
          <p style={{margin: '0 0 8px 0'}}>
            <strong>Pie Chart (Market Cap Distribution):</strong> Shows market maturity - more large caps indicate an established market, while more small caps suggest emerging opportunities.
          </p>
          <p style={{margin: 0}}>
            <strong>Bar Chart (Top 10 by Market Cap):</strong> Reveals market concentration - if top coins dominate significantly, the market is concentrated; more even distribution suggests healthy competition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataInsights;