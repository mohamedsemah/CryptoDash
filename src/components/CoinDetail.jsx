import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowLeft, ExternalLink, Activity, BarChart3, Globe, Star, Users, Calendar } from 'lucide-react';
import Sidebar from './Sidebar';
import { containerStyle, cardStyle, formatPrice, formatMarketCap, formatNumber } from '../styles/commonStyles';

const CoinDetail = ({ cryptoData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coin = cryptoData.find(c => c.id === id);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`);

        if (!response.ok) throw new Error('Failed to fetch coin details');

        const data = await response.json();
        setCoinDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCoinDetails();
  }, [id]);

  if (!coin && !loading) {
    return (
      <div style={{...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '24px', marginBottom: '20px'}}>Coin not found</h2>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%)',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading || error) {
    return (
      <div style={containerStyle}>
        <div style={{display: 'flex', minHeight: '100vh'}}>
          <Sidebar
            searchQuery=""
            setSearchQuery={() => {}}
            priceFilter="all"
            setPriceFilter={() => {}}
            marketCapFilter="all"
            setMarketCapFilter={() => {}}
            changeFilter="all"
            setChangeFilter={() => {}}
            customPriceMin=""
            setCustomPriceMin={() => {}}
            customPriceMax=""
            setCustomPriceMax={() => {}}
            volumeRange={[0, 100]}
            setVolumeRange={() => {}}
            showAdvancedFilters={false}
            setShowAdvancedFilters={() => {}}
            clearAllFilters={() => {}}
          />
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={cardStyle}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '40px', marginBottom: '20px'}}>
                  {loading ? '⏳' : '❌'}
                </div>
                <h2 style={{fontSize: '24px', marginBottom: '10px'}}>
                  {loading ? 'Loading coin details...' : `Error: ${error}`}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare sparkline data for chart
  const sparklineData = coinDetails?.market_data?.sparkline_7d?.price?.map((price, index) => ({
    day: index,
    price: price
  })) || [];

  return (
    <div style={containerStyle}>
      <div style={{display: 'flex', minHeight: '100vh'}}>
        <Sidebar
          searchQuery=""
          setSearchQuery={() => {}}
          priceFilter="all"
          setPriceFilter={() => {}}
          marketCapFilter="all"
          setMarketCapFilter={() => {}}
          changeFilter="all"
          setChangeFilter={() => {}}
          customPriceMin=""
          setCustomPriceMin={() => {}}
          customPriceMax=""
          setCustomPriceMax={() => {}}
          volumeRange={[0, 100]}
          setVolumeRange={() => {}}
          showAdvancedFilters={false}
          setShowAdvancedFilters={() => {}}
          clearAllFilters={() => {}}
        />

        <div style={{flex: 1, padding: '30px', overflowY: 'auto'}}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px 20px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(78, 205, 196, 0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          {/* Coin Header */}
          <div style={{...cardStyle, marginBottom: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px'}}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid rgba(78, 205, 196, 0.3)',
                flexShrink: 0
              }}>
                <img src={coin.image} alt={coin.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{flex: 1}}>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  margin: '0 0 8px 0',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {coin.name}
                </h1>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                  <span style={{
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {coin.symbol}
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    Rank #{coin.market_cap_rank}
                  </span>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '32px', fontWeight: '800', marginBottom: '8px'}}>
                  {formatPrice(coin.current_price)}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: coin.price_change_percentage_24h >= 0 ? '#43e97b' : '#ff6b6b',
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  background: coin.price_change_percentage_24h >= 0 ? 'rgba(67, 233, 123, 0.1)' : 'rgba(255, 107, 107, 0.1)'
                }}>
                  {coin.price_change_percentage_24h >= 0 ?
                    <TrendingUp size={16} style={{marginRight: '6px'}} /> :
                    <TrendingDown size={16} style={{marginRight: '6px'}} />
                  }
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}% (24h)
                </div>
              </div>
            </div>

            {coinDetails?.description?.en && (
              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#4ecdc4'}}>
                  About {coin.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0
                }}>
                  {coinDetails.description.en.split('.')[0]}.
                </p>
              </div>
            )}
          </div>

          {/* Key Statistics Grid */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px'}}>
            {[
              { label: 'Market Cap', value: formatMarketCap(coin.market_cap), icon: BarChart3, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
              { label: '24h Volume', value: formatMarketCap(coin.total_volume), icon: Activity, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
              { label: 'Circulating Supply', value: formatNumber(coin.circulating_supply), icon: Globe, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
              { label: 'All-Time High', value: coinDetails?.market_data?.ath?.usd ? formatPrice(coinDetails.market_data.ath.usd) : 'N/A', icon: Star, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: stat.gradient,
                  borderRadius: '16px',
                  padding: '20px',
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <stat.icon size={24} style={{marginBottom: '10px'}} />
                <p style={{fontSize: '12px', margin: '0 0 8px 0', opacity: 0.9}}>{stat.label}</p>
                <p style={{fontSize: '18px', fontWeight: '800', margin: 0}}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Price Chart and Additional Details */}
          <div style={{display: 'flex', gap: '30px', marginBottom: '30px', flexWrap: 'wrap'}}>
            {/* 7-Day Price Chart */}
            {sparklineData.length > 0 && (
              <div style={{
                ...cardStyle,
                flex: 2,
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
                  <Activity size={20} />
                  7-Day Price Trend
                </h3>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={sparklineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="day"
                      stroke="#ffffff"
                      fontSize={12}
                      tickFormatter={(value) => `Day ${value + 1}`}
                    />
                    <YAxis
                      stroke="#ffffff"
                      fontSize={12}
                      tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(26, 26, 46, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff'
                      }}
                      formatter={(value) => [formatPrice(value), 'Price']}
                      labelFormatter={(value) => `Day ${value + 1}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#4ecdc4"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, stroke: '#4ecdc4', strokeWidth: 2, fill: '#ffffff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Additional Market Data */}
            <div style={{
              ...cardStyle,
              flex: 1,
              minWidth: '300px'
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
                Market Statistics
              </h3>

              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {[
                  {
                    label: '24h High',
                    value: coin.high_24h ? formatPrice(coin.high_24h) : 'N/A',
                    color: '#43e97b'
                  },
                  {
                    label: '24h Low',
                    value: coin.low_24h ? formatPrice(coin.low_24h) : 'N/A',
                    color: '#ff6b6b'
                  },
                  {
                    label: 'Market Cap Rank',
                    value: `#${coin.market_cap_rank}`,
                    color: '#4ecdc4'
                  },
                  {
                    label: 'Price Change (7d)',
                    value: coinDetails?.market_data?.price_change_percentage_7d ?
                      `${coinDetails.market_data.price_change_percentage_7d.toFixed(2)}%` : 'N/A',
                    color: coinDetails?.market_data?.price_change_percentage_7d >= 0 ? '#43e97b' : '#ff6b6b'
                  },
                  {
                    label: 'Price Change (30d)',
                    value: coinDetails?.market_data?.price_change_percentage_30d ?
                      `${coinDetails.market_data.price_change_percentage_30d.toFixed(2)}%` : 'N/A',
                    color: coinDetails?.market_data?.price_change_percentage_30d >= 0 ? '#43e97b' : '#ff6b6b'
                  },
                  {
                    label: 'Total Supply',
                    value: coinDetails?.market_data?.total_supply ?
                      formatNumber(coinDetails.market_data.total_supply) : 'N/A',
                    color: '#f093fb'
                  }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: '500'
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: item.color
                    }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links and Additional Information */}
          {coinDetails && (
            <div style={{...cardStyle}}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#4ecdc4',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <ExternalLink size={20} />
                Official Links
              </h3>

              <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                {coinDetails.links?.homepage?.[0] && (
                  <a
                    href={coinDetails.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <Globe size={16} />
                    Official Website
                  </a>
                )}

                {coinDetails.links?.blockchain_site?.filter(site => site)?.[0] && (
                  <a
                    href={coinDetails.links.blockchain_site.filter(site => site)[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <Activity size={16} />
                    Blockchain Explorer
                  </a>
                )}

                {coinDetails.links?.repos_url?.github?.[0] && (
                  <a
                    href={coinDetails.links.repos_url.github[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <ExternalLink size={16} />
                    GitHub
                  </a>
                )}
              </div>

              {/* Community Stats */}
              {(coinDetails.community_data?.twitter_followers || coinDetails.community_data?.reddit_subscribers) && (
                <div style={{marginTop: '25px'}}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '15px',
                    color: '#ffffff'
                  }}>
                    Community
                  </h4>
                  <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                    {coinDetails.community_data.twitter_followers && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        background: 'rgba(29, 161, 242, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(29, 161, 242, 0.2)'
                      }}>
                        <Users size={16} style={{color: '#1da1f2'}} />
                        <span style={{fontSize: '14px', color: '#ffffff'}}>
                          {formatNumber(coinDetails.community_data.twitter_followers)} Twitter followers
                        </span>
                      </div>
                    )}

                    {coinDetails.community_data.reddit_subscribers && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        background: 'rgba(255, 69, 0, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 69, 0, 0.2)'
                      }}>
                        <Users size={16} style={{color: '#ff4500'}} />
                        <span style={{fontSize: '14px', color: '#ffffff'}}>
                          {formatNumber(coinDetails.community_data.reddit_subscribers)} Reddit subscribers
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Last Updated */}
              <div style={{
                marginTop: '20px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Calendar size={14} />
                Last updated: {new Date(coinDetails.last_updated).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;