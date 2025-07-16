import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Activity, Filter } from 'lucide-react';

const CryptoDash = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('');
  const [fetchProgress, setFetchProgress] = useState(0);

  // Fetch cryptocurrency data with visible progress
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setFetchStatus('🚀 useEffect triggered - Starting data fetch...');
        setFetchProgress(10);

        // Simulate some delay to make async visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        setFetchStatus('📡 async/await: Calling CoinGecko API...');
        setFetchProgress(30);

        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en');

        setFetchStatus('⏳ await: Waiting for API response...');
        setFetchProgress(60);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        setFetchStatus('📊 await: Processing JSON data...');
        setFetchProgress(80);

        const data = await response.json();

        // Another small delay to show processing
        await new Promise(resolve => setTimeout(resolve, 500));

        setFetchStatus('✅ async/await complete - Data loaded!');
        setFetchProgress(100);

        setCryptoData(data);
        setFilteredData(data);

        // Clear status after showing success
        setTimeout(() => {
          setFetchStatus('');
          setFetchProgress(0);
        }, 2000);

      } catch (err) {
        setFetchStatus('❌ async/await error occurred');
        setError(err.message);
        setFetchProgress(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  // Filter data based on search query and price filter
  useEffect(() => {
    let filtered = cryptoData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(coin => {
        if (priceFilter === 'under1') return coin.current_price < 1;
        if (priceFilter === '1to100') return coin.current_price >= 1 && coin.current_price <= 100;
        if (priceFilter === '100to1000') return coin.current_price > 100 && coin.current_price <= 1000;
        if (priceFilter === 'over1000') return coin.current_price > 1000;
        return true;
      });
    }

    setFilteredData(filtered);
  }, [searchQuery, priceFilter, cryptoData]);

  // Calculate summary statistics
  const calculateStats = () => {
    if (cryptoData.length === 0) return { total: 0, avgPrice: 0, totalMarketCap: 0, positiveChange: 0 };

    const total = cryptoData.length;
    const avgPrice = cryptoData.reduce((sum, coin) => sum + coin.current_price, 0) / total;
    const totalMarketCap = cryptoData.reduce((sum, coin) => sum + coin.market_cap, 0);
    const positiveChange = cryptoData.filter(coin => coin.price_change_percentage_24h > 0).length;

    return { total, avgPrice, totalMarketCap, positiveChange };
  };

  const stats = calculateStats();

  const formatPrice = (price) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString()}`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    width: '100%'
  };

  const tableStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  if (loading) {
    return (
      <div style={{...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px'}}>
        <div style={{...cardStyle, textAlign: 'center', maxWidth: '600px', width: '100%'}}>
          <Activity size={64} style={{marginBottom: '24px', color: '#60a5fa'}} />
          <h2 style={{fontSize: '32px', fontWeight: 'bold', margin: '0 0 24px 0'}}>CryptoDash Loading</h2>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            marginBottom: '24px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${fetchProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #60a5fa, #34d399)',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }}></div>
          </div>

          {/* Status Messages */}
          <div style={{
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '16px',
            minHeight: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {fetchStatus}
          </div>

          <div style={{fontSize: '14px', color: '#d1d5db', marginBottom: '24px'}}>
            Demonstrating useEffect React hook with async/await API calls
          </div>

          <div style={{fontSize: '16px', fontWeight: '600'}}>
            Progress: {fetchProgress}%
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '24px', color: '#ef4444'}}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{padding: '48px 24px'}}>
        {/* Header with Refresh Button */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Activity size={40} style={{marginRight: '16px'}} />
            <h1 style={{fontSize: '48px', fontWeight: 'bold', margin: 0}}>CryptoDash</h1>
          </div>

          <button
            onClick={() => window.location.reload()}
            style={{
              ...cardStyle,
              padding: '12px 24px',
              background: 'rgba(96, 165, 250, 0.2)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(96, 165, 250, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(96, 165, 250, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <Activity size={20} />
            Demo useEffect + async/await
          </button>
        </div>

        {/* Summary Statistics */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px'}}>
          <div style={cardStyle}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '14px', color: '#d1d5db', margin: '0 0 8px 0'}}>Total Cryptocurrencies</p>
                <p style={{fontSize: '32px', fontWeight: 'bold', margin: 0}}>{stats.total}</p>
              </div>
              <DollarSign size={32} style={{color: '#60a5fa'}} />
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '14px', color: '#d1d5db', margin: '0 0 8px 0'}}>Average Price</p>
                <p style={{fontSize: '32px', fontWeight: 'bold', margin: 0}}>{formatPrice(stats.avgPrice)}</p>
              </div>
              <Activity size={32} style={{color: '#34d399'}} />
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '14px', color: '#d1d5db', margin: '0 0 8px 0'}}>Total Market Cap</p>
                <p style={{fontSize: '32px', fontWeight: 'bold', margin: 0}}>{formatMarketCap(stats.totalMarketCap)}</p>
              </div>
              <TrendingUp size={32} style={{color: '#a78bfa'}} />
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '14px', color: '#d1d5db', margin: '0 0 8px 0'}}>Positive 24h Change</p>
                <p style={{fontSize: '32px', fontWeight: 'bold', margin: 0}}>{stats.positiveChange}</p>
              </div>
              <TrendingUp size={32} style={{color: '#34d399'}} />
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div style={{display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap'}}>
          <div style={{position: 'relative', flex: 1, minWidth: '300px'}}>
            <Search size={20} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{...inputStyle, paddingLeft: '44px'}}
            />
          </div>

          <div style={{position: 'relative', minWidth: '200px'}}>
            <Filter size={20} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{
                ...inputStyle,
                paddingLeft: '44px',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
            >
              <option value="all" style={{background: '#1f2937', color: 'white'}}>All Prices</option>
              <option value="under1" style={{background: '#1f2937', color: 'white'}}>Under $1</option>
              <option value="1to100" style={{background: '#1f2937', color: 'white'}}>$1 - $100</option>
              <option value="100to1000" style={{background: '#1f2937', color: 'white'}}>$100 - $1,000</option>
              <option value="over1000" style={{background: '#1f2937', color: 'white'}}>Over $1,000</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div style={tableStyle}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead style={{background: 'rgba(255, 255, 255, 0.1)'}}>
              <tr>
                <th style={{textAlign: 'left', padding: '16px', fontWeight: '600', fontSize: '14px'}}>Rank</th>
                <th style={{textAlign: 'left', padding: '16px', fontWeight: '600', fontSize: '14px'}}>Cryptocurrency</th>
                <th style={{textAlign: 'left', padding: '16px', fontWeight: '600', fontSize: '14px'}}>Price</th>
                <th style={{textAlign: 'left', padding: '16px', fontWeight: '600', fontSize: '14px'}}>24h Change</th>
                <th style={{textAlign: 'left', padding: '16px', fontWeight: '600', fontSize: '14px'}}>Market Cap</th>
                <th style={{textAlign: 'left', padding: '16px', fontWeight: '600', fontSize: '14px'}}>Volume</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((coin, index) => (
                <tr key={coin.id} style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <td style={{padding: '16px', color: '#d1d5db'}}>#{coin.market_cap_rank}</td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <img src={coin.image} alt={coin.name} style={{width: '32px', height: '32px', marginRight: '12px', borderRadius: '50%'}} />
                      <div>
                        <p style={{fontWeight: '600', margin: '0 0 4px 0'}}>{coin.name}</p>
                        <p style={{fontSize: '12px', color: '#9ca3af', margin: 0}}>{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{padding: '16px', fontWeight: '600'}}>{formatPrice(coin.current_price)}</td>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', color: coin.price_change_percentage_24h >= 0 ? '#34d399' : '#ef4444'}}>
                      {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={16} style={{marginRight: '4px'}} /> : <TrendingDown size={16} style={{marginRight: '4px'}} />}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </td>
                  <td style={{padding: '16px'}}>{formatMarketCap(coin.market_cap)}</td>
                  <td style={{padding: '16px'}}>{formatMarketCap(coin.total_volume)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div style={{textAlign: 'center', padding: '48px', color: '#9ca3af'}}>
              No cryptocurrencies found matching your search criteria.
            </div>
          )}
        </div>

        <div style={{marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#9ca3af'}}>
          Showing {filteredData.length} of {cryptoData.length} cryptocurrencies
        </div>
      </div>
    </div>
  );
};

export default CryptoDash;