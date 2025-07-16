import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, Activity, Filter, BarChart3, Zap, Star, Globe, Layers } from 'lucide-react';

const CryptoDash = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('');
  const [fetchProgress, setFetchProgress] = useState(0);

  // Additional filter states
  const [marketCapFilter, setMarketCapFilter] = useState('all');
  const [changeFilter, setChangeFilter] = useState('all');
  const [customPriceMin, setCustomPriceMin] = useState('');
  const [customPriceMax, setCustomPriceMax] = useState('');
  const [volumeRange, setVolumeRange] = useState([0, 100]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Fetch cryptocurrency data with visible progress
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setFetchStatus('🚀 useEffect triggered - Starting data fetch...');
        setFetchProgress(10);

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

        await new Promise(resolve => setTimeout(resolve, 500));

        setFetchStatus('✅ async/await complete - Data loaded!');
        setFetchProgress(100);

        setCryptoData(data);
        setFilteredData(data);

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

  // Filter data based on all applied filters
  useEffect(() => {
    let filtered = cryptoData;

    if (searchQuery) {
      filtered = filtered.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceFilter !== 'all') {
      filtered = filtered.filter(coin => {
        if (priceFilter === 'under1') return coin.current_price < 1;
        if (priceFilter === '1to100') return coin.current_price >= 1 && coin.current_price <= 100;
        if (priceFilter === '100to1000') return coin.current_price > 100 && coin.current_price <= 1000;
        if (priceFilter === 'over1000') return coin.current_price > 1000;
        return true;
      });
    }

    if (customPriceMin !== '' || customPriceMax !== '') {
      filtered = filtered.filter(coin => {
        const price = coin.current_price;
        const minPrice = customPriceMin === '' ? 0 : parseFloat(customPriceMin);
        const maxPrice = customPriceMax === '' ? Infinity : parseFloat(customPriceMax);
        return price >= minPrice && price <= maxPrice;
      });
    }

    if (marketCapFilter !== 'all') {
      filtered = filtered.filter(coin => {
        const marketCap = coin.market_cap;
        if (marketCapFilter === 'large') return marketCap >= 10e9;
        if (marketCapFilter === 'medium') return marketCap >= 1e9 && marketCap < 10e9;
        if (marketCapFilter === 'small') return marketCap >= 100e6 && marketCap < 1e9;
        if (marketCapFilter === 'micro') return marketCap < 100e6;
        return true;
      });
    }

    if (changeFilter !== 'all') {
      filtered = filtered.filter(coin => {
        const change = coin.price_change_percentage_24h;
        if (changeFilter === 'positive') return change > 0;
        if (changeFilter === 'negative') return change < 0;
        if (changeFilter === 'high-gain') return change > 10;
        if (changeFilter === 'high-loss') return change < -10;
        return true;
      });
    }

    if (cryptoData.length > 0) {
      const volumes = cryptoData.map(coin => coin.total_volume).sort((a, b) => a - b);
      const minVolume = volumes[0];
      const maxVolume = volumes[volumes.length - 1];
      const rangeMin = minVolume + (maxVolume - minVolume) * (volumeRange[0] / 100);
      const rangeMax = minVolume + (maxVolume - minVolume) * (volumeRange[1] / 100);

      filtered = filtered.filter(coin =>
        coin.total_volume >= rangeMin && coin.total_volume <= rangeMax
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, priceFilter, customPriceMin, customPriceMax, marketCapFilter, changeFilter, volumeRange, cryptoData]);

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

  // Modern Design Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    padding: '0'
  };

  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '15px 20px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  if (loading) {
    return (
      <div style={{...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px'}}>
        <div style={{...cardStyle, textAlign: 'center', maxWidth: '700px', width: '100%', background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)'}}>
          <div style={{fontSize: '80px', marginBottom: '30px'}}>🚀</div>
          <h2 style={{fontSize: '36px', fontWeight: '700', margin: '0 0 30px 0', background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            CryptoDash Loading
          </h2>

          <div style={{
            width: '100%',
            height: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            marginBottom: '30px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${fetchProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)',
              borderRadius: '6px',
              transition: 'width 0.5s ease',
              boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
            }}></div>
          </div>

          <div style={{
            fontSize: '20px',
            fontWeight: '500',
            marginBottom: '20px',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {fetchStatus}
          </div>

          <div style={{fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px'}}>
            Demonstrating useEffect React hook with async/await API calls
          </div>

          <div style={{fontSize: '18px', fontWeight: '700', color: '#4ecdc4'}}>
            Progress: {fetchProgress}%
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '24px', color: '#ff6b6b'}}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{display: 'flex', minHeight: '100vh'}}>

        {/* LEFT SIDEBAR */}
        <div style={{
          width: '400px',
          minWidth: '400px',
          background: 'linear-gradient(180deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '30px',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{marginBottom: '40px', textAlign: 'center'}}>
            <div style={{fontSize: '50px', marginBottom: '15px'}}>₿</div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '800',
              margin: '0 0 10px 0',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              CryptoDash
            </h1>
            <p style={{fontSize: '14px', margin: 0, opacity: 0.8}}>
              Real-time crypto analytics
            </p>
          </div>

          {/* Demo Button */}
          <button
            onClick={() => window.location.reload()}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <Zap size={20} />
            Demo useEffect + async/await
          </button>

          {/* Search */}
          <div style={{marginBottom: '25px'}}>
            <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '8px', display: 'block'}}>
              🔍 Search Cryptocurrencies
            </label>
            <div style={{position: 'relative'}}>
              <Search size={20} style={{position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)'}} />
              <input
                type="text"
                placeholder="Search by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{...inputStyle, paddingLeft: '50px'}}
              />
            </div>
          </div>

          {/* Price Filter */}
          <div style={{marginBottom: '25px'}}>
            <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '8px', display: 'block'}}>
              💰 Quick Price Filter
            </label>
            <div style={{position: 'relative'}}>
              <Filter size={20} style={{position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)'}} />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{...inputStyle, paddingLeft: '50px', cursor: 'pointer'}}
              >
                <option value="all" style={{background: '#1a1a2e', color: 'white'}}>All Prices</option>
                <option value="under1" style={{background: '#1a1a2e', color: 'white'}}>Under $1</option>
                <option value="1to100" style={{background: '#1a1a2e', color: 'white'}}>$1 - $100</option>
                <option value="100to1000" style={{background: '#1a1a2e', color: 'white'}}>$100 - $1,000</option>
                <option value="over1000" style={{background: '#1a1a2e', color: 'white'}}>Over $1,000</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            style={{
              width: '100%',
              background: showAdvancedFilters ? 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: '15px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s ease'
            }}
          >
            <Layers size={18} />
            {showAdvancedFilters ? 'Hide Advanced' : 'Show Advanced'}
          </button>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div>
              {/* Custom Price Range */}
              <div style={{marginBottom: '25px'}}>
                <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '8px', display: 'block'}}>
                  📊 Custom Price Range
                </label>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <div style={{flex: 1}}>
                    <input
                      type="number"
                      placeholder="Min $"
                      value={customPriceMin}
                      onChange={(e) => setCustomPriceMin(e.target.value)}
                      style={{...inputStyle, fontSize: '14px'}}
                    />
                  </div>
                  <span style={{color: 'rgba(255,255,255,0.7)'}}>to</span>
                  <div style={{flex: 1}}>
                    <input
                      type="number"
                      placeholder="Max $"
                      value={customPriceMax}
                      onChange={(e) => setCustomPriceMax(e.target.value)}
                      style={{...inputStyle, fontSize: '14px'}}
                    />
                  </div>
                </div>
              </div>

              {/* Market Cap Filter */}
              <div style={{marginBottom: '25px'}}>
                <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '12px', display: 'block'}}>
                  🏢 Market Cap Size
                </label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {[
                    {value: 'all', label: 'All Sizes', emoji: '🌐'},
                    {value: 'large', label: 'Large (>$10B)', emoji: '🦣'},
                    {value: 'medium', label: 'Medium ($1B-$10B)', emoji: '🐘'},
                    {value: 'small', label: 'Small ($100M-$1B)', emoji: '🐎'},
                    {value: 'micro', label: 'Micro (<$100M)', emoji: '🐁'}
                  ].map(option => (
                    <label key={option.value} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: '14px',
                      padding: '8px',
                      borderRadius: '8px',
                      background: marketCapFilter === option.value ? 'rgba(78, 205, 196, 0.2)' : 'transparent'
                    }}>
                      <input
                        type="radio"
                        name="marketCap"
                        value={option.value}
                        checked={marketCapFilter === option.value}
                        onChange={(e) => setMarketCapFilter(e.target.value)}
                        style={{accentColor: '#4ecdc4'}}
                      />
                      <span>{option.emoji} {option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 24h Change Filter */}
              <div style={{marginBottom: '25px'}}>
                <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '12px', display: 'block'}}>
                  📈 24h Performance
                </label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {[
                    {value: 'all', label: 'All Changes', emoji: '🔄'},
                    {value: 'positive', label: 'Gainers', emoji: '📈'},
                    {value: 'negative', label: 'Losers', emoji: '📉'},
                    {value: 'high-gain', label: 'Moon (>+10%)', emoji: '🚀'},
                    {value: 'high-loss', label: 'Crash (<-10%)', emoji: '💥'}
                  ].map(option => (
                    <label key={option.value} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: '14px',
                      padding: '8px',
                      borderRadius: '8px',
                      background: changeFilter === option.value ? 'rgba(255, 107, 107, 0.2)' : 'transparent'
                    }}>
                      <input
                        type="radio"
                        name="change"
                        value={option.value}
                        checked={changeFilter === option.value}
                        onChange={(e) => setChangeFilter(e.target.value)}
                        style={{accentColor: '#ff6b6b'}}
                      />
                      <span>{option.emoji} {option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Volume Range Slider */}
              <div style={{marginBottom: '25px'}}>
                <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '12px', display: 'block'}}>
                  📊 Volume Range: {volumeRange[0]}% - {volumeRange[1]}%
                </label>
                <div style={{position: 'relative'}}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeRange[0]}
                    onChange={(e) => setVolumeRange([parseInt(e.target.value), volumeRange[1]])}
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'linear-gradient(90deg, #4ecdc4, #45b7d1)',
                      borderRadius: '3px',
                      outline: 'none',
                      cursor: 'pointer',
                      accentColor: '#4ecdc4'
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeRange[1]}
                    onChange={(e) => setVolumeRange([volumeRange[0], parseInt(e.target.value)])}
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'transparent',
                      borderRadius: '3px',
                      outline: 'none',
                      cursor: 'pointer',
                      marginTop: '-6px',
                      accentColor: '#ff6b6b'
                    }}
                  />
                </div>
              </div>

              {/* Clear All Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPriceFilter('all');
                  setCustomPriceMin('');
                  setCustomPriceMax('');
                  setMarketCapFilter('all');
                  setChangeFilter('all');
                  setVolumeRange([0, 100]);
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🗑️ Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div style={{flex: 1, padding: '30px', overflowY: 'auto'}}>

          {/* Statistics Cards */}
          <div style={{display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap'}}>
            {[
              { title: 'Total Coins', value: stats.total, icon: Globe, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
              { title: 'Avg Price', value: formatPrice(stats.avgPrice), icon: DollarSign, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
              { title: 'Market Cap', value: formatMarketCap(stats.totalMarketCap), icon: BarChart3, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
              { title: 'Gainers', value: stats.positiveChange, icon: Star, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  minWidth: '200px',
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
                <stat.icon size={30} style={{marginBottom: '10px'}} />
                <p style={{fontSize: '12px', margin: '0 0 8px 0', opacity: 0.9}}>{stat.title}</p>
                <p style={{fontSize: '20px', fontWeight: '800', margin: 0}}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Results Counter */}
          <div style={{
            marginBottom: '20px',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: '600'
          }}>
            Showing <span style={{color: '#4ecdc4'}}>{filteredData.length}</span> of <span style={{color: '#4ecdc4'}}>{cryptoData.length}</span> cryptocurrencies
            {filteredData.length !== cryptoData.length && (
              <span style={{color: '#ff6b6b', marginLeft: '10px', fontSize: '14px'}}>
                (filtered)
              </span>
            )}
          </div>

          {/* Cryptocurrency Table */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
              <thead style={{background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)'}}>
                <tr>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontWeight: '700', fontSize: '12px', color: '#4ecdc4'}}>Rank</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontWeight: '700', fontSize: '12px', color: '#4ecdc4'}}>Coin</th>
                  <th style={{textAlign: 'right', padding: '12px 16px', fontWeight: '700', fontSize: '12px', color: '#4ecdc4'}}>Price</th>
                  <th style={{textAlign: 'right', padding: '12px 16px', fontWeight: '700', fontSize: '12px', color: '#4ecdc4'}}>24h %</th>
                  <th style={{textAlign: 'right', padding: '12px 16px', fontWeight: '700', fontSize: '12px', color: '#4ecdc4'}}>Market Cap</th>
                  <th style={{textAlign: 'right', padding: '12px 16px', fontWeight: '700', fontSize: '12px', color: '#4ecdc4'}}>Volume 24h</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((coin, index) => (
                  <tr
                    key={coin.id}
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(78, 205, 196, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{padding: '10px 16px', color: 'rgba(255,255,255,0.6)'}}>
                      <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '10px',
                        fontWeight: '700',
                        display: 'inline-block',
                        minWidth: '24px',
                        textAlign: 'center'
                      }}>
                        {coin.market_cap_rank}
                      </div>
                    </td>
                    <td style={{padding: '10px 16px'}}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          marginRight: '10px',
                          overflow: 'hidden',
                          border: '1px solid rgba(78, 205, 196, 0.3)',
                          flexShrink: 0
                        }}>
                          <img src={coin.image} alt={coin.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        </div>
                        <div style={{minWidth: 0}}>
                          <div style={{fontWeight: '600', margin: '0 0 2px 0', fontSize: '13px', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px'}}>{coin.name}</div>
                          <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px'}}>{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding: '10px 16px', fontWeight: '600', fontSize: '13px', color: '#ffffff', textAlign: 'right'}}>{formatPrice(coin.current_price)}</td>
                    <td style={{padding: '10px 16px', textAlign: 'right'}}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: coin.price_change_percentage_24h >= 0 ? '#43e97b' : '#ff6b6b',
                        fontWeight: '600',
                        fontSize: '12px',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        background: coin.price_change_percentage_24h >= 0 ? 'rgba(67, 233, 123, 0.1)' : 'rgba(255, 107, 107, 0.1)'
                      }}>
                        {coin.price_change_percentage_24h >= 0 ?
                          <TrendingUp size={12} style={{marginRight: '3px'}} /> :
                          <TrendingDown size={12} style={{marginRight: '3px'}} />
                        }
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td style={{padding: '10px 16px', fontWeight: '500', color: 'rgba(255,255,255,0.8)', fontSize: '12px', textAlign: 'right'}}>{formatMarketCap(coin.market_cap)}</td>
                    <td style={{padding: '10px 16px', fontWeight: '500', color: 'rgba(255,255,255,0.8)', fontSize: '12px', textAlign: 'right'}}>{formatMarketCap(coin.total_volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* No Results Message */}
            {filteredData.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '16px'
              }}>
                <div style={{fontSize: '40px', marginBottom: '15px'}}>🔍</div>
                <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#ffffff'}}>No Results Found</h3>
                <p style={{fontSize: '14px', margin: 0}}>Try adjusting your filters to see more cryptocurrencies.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDash;