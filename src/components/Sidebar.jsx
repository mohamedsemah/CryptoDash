import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Layers } from 'lucide-react';
import { inputStyle } from '../styles/commonStyles';

const Sidebar = ({
  searchQuery, setSearchQuery, priceFilter, setPriceFilter,
  marketCapFilter, setMarketCapFilter, changeFilter, setChangeFilter,
  customPriceMin, setCustomPriceMin, customPriceMax, setCustomPriceMax,
  volumeRange, setVolumeRange, showAdvancedFilters, setShowAdvancedFilters,
  clearAllFilters
}) => {
  const marketCapOptions = [
    {value: 'all', label: 'All Sizes', emoji: '🌐'},
    {value: 'large', label: 'Large (>$10B)', emoji: '🦣'},
    {value: 'medium', label: 'Medium ($1B-$10B)', emoji: '🐘'},
    {value: 'small', label: 'Small ($100M-$1B)', emoji: '🐎'},
    {value: 'micro', label: 'Micro (<$100M)', emoji: '🐁'}
  ];

  const changeOptions = [
    {value: 'all', label: 'All Changes', emoji: '🔄'},
    {value: 'positive', label: 'Gainers', emoji: '📈'},
    {value: 'negative', label: 'Losers', emoji: '📉'},
    {value: 'high-gain', label: 'Moon (>+10%)', emoji: '🚀'},
    {value: 'high-loss', label: 'Crash (<-10%)', emoji: '💥'}
  ];

  return (
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
        <Link to="/" style={{textDecoration: 'none'}}>
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
        </Link>
        <p style={{fontSize: '14px', margin: 0, opacity: 0.8}}>Real-time crypto analytics</p>
      </div>



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
              <input
                type="number"
                placeholder="Min $"
                value={customPriceMin}
                onChange={(e) => setCustomPriceMin(e.target.value)}
                style={{...inputStyle, fontSize: '14px', flex: 1}}
              />
              <span style={{color: 'rgba(255,255,255,0.7)'}}>to</span>
              <input
                type="number"
                placeholder="Max $"
                value={customPriceMax}
                onChange={(e) => setCustomPriceMax(e.target.value)}
                style={{...inputStyle, fontSize: '14px', flex: 1}}
              />
            </div>
          </div>

          {/* Market Cap Filter */}
          <div style={{marginBottom: '25px'}}>
            <label style={{fontSize: '14px', fontWeight: '600', color: '#4ecdc4', marginBottom: '12px', display: 'block'}}>
              🏢 Market Cap Size
            </label>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {marketCapOptions.map(option => (
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
              {changeOptions.map(option => (
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
            onClick={clearAllFilters}
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
  );
};

export default Sidebar;