import React, { useState } from 'react';
import { Globe, DollarSign, BarChart3, Star, Info, Eye, EyeOff, TrendingUp, Filter, Lightbulb } from 'lucide-react';
import Sidebar from './Sidebar';
import LoadingScreen from './LoadingScreen';
import Charts from './Charts';
import CryptoTable from './CryptoTable';
import DataInsights from './DataInsights';
import { containerStyle, formatPrice, formatMarketCap } from '../styles/commonStyles';

const Dashboard = ({
  cryptoData, filteredData, loading, error, fetchStatus, fetchProgress,
  searchQuery, setSearchQuery, priceFilter, setPriceFilter,
  marketCapFilter, setMarketCapFilter, changeFilter, setChangeFilter,
  customPriceMin, setCustomPriceMin, customPriceMax, setCustomPriceMax,
  volumeRange, setVolumeRange, showAdvancedFilters, setShowAdvancedFilters,
  clearAllFilters
}) => {

  // State for toggling visualizations - DEFAULT TO OFF
  const [showCharts, setShowCharts] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showFilterSuggestions, setShowFilterSuggestions] = useState(false);

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

  // Generate filter suggestions based on current data
  const getFilterSuggestions = () => {
    if (cryptoData.length === 0) return [];

    const suggestions = [];

    // Analyze data for suggestions
    const gainers = cryptoData.filter(coin => coin.price_change_percentage_24h > 10).length;
    const largeCaps = cryptoData.filter(coin => coin.market_cap >= 10e9).length;
    const underDollar = cryptoData.filter(coin => coin.current_price < 1).length;

    if (gainers > 5) {
      suggestions.push({
        title: "🚀 High Performers",
        description: `${gainers} coins are up 10%+ today! Try the "Moon (>+10%)" filter to find potential opportunities.`,
        filterAction: () => setChangeFilter('high-gain'),
        color: '#43e97b'
      });
    }

    if (largeCaps > 10) {
      suggestions.push({
        title: "🏢 Blue Chip Focus",
        description: `${largeCaps} large-cap cryptocurrencies available. Filter by "Large Cap" for established projects.`,
        filterAction: () => setMarketCapFilter('large'),
        color: '#4ecdc4'
      });
    }

    if (underDollar > 15) {
      suggestions.push({
        title: "💰 Budget Finds",
        description: `${underDollar} coins under $1. Use "Under $1" filter for affordable entry points.`,
        filterAction: () => setPriceFilter('under1'),
        color: '#f093fb'
      });
    }

    return suggestions;
  };

  const filterSuggestions = getFilterSuggestions();

  if (loading) {
    return <LoadingScreen fetchStatus={fetchStatus} fetchProgress={fetchProgress} />;
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
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          marketCapFilter={marketCapFilter}
          setMarketCapFilter={setMarketCapFilter}
          changeFilter={changeFilter}
          setChangeFilter={setChangeFilter}
          customPriceMin={customPriceMin}
          setCustomPriceMin={setCustomPriceMin}
          customPriceMax={customPriceMax}
          setCustomPriceMax={setCustomPriceMax}
          volumeRange={volumeRange}
          setVolumeRange={setVolumeRange}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          clearAllFilters={clearAllFilters}
        />

        <div style={{flex: 1, padding: '30px', overflowY: 'auto'}}>
          {/* Visualization Toggle Controls */}
          <div style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '25px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              margin: 0,
              background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              flex: 1,
              minWidth: '200px'
            }}>
              Cryptocurrency Analytics
            </h2>

            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              <button
                onClick={() => setShowInsights(!showInsights)}
                style={{
                  background: showInsights ? 'linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                {showInsights ? <Eye size={14} /> : <EyeOff size={14} />}
                Insights
              </button>

              <button
                onClick={() => setShowCharts(!showCharts)}
                style={{
                  background: showCharts ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                {showCharts ? <Eye size={14} /> : <EyeOff size={14} />}
                Charts
              </button>

              <button
                onClick={() => setShowFilterSuggestions(!showFilterSuggestions)}
                style={{
                  background: showFilterSuggestions ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
              >
                {showFilterSuggestions ? <Eye size={14} /> : <EyeOff size={14} />}
                Suggestions
              </button>
            </div>
          </div>

          {/* Data Insights Section */}
          {showInsights && <DataInsights cryptoData={cryptoData} stats={stats} />}

          {/* Filter Suggestions */}
          {showFilterSuggestions && filterSuggestions.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '30px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '15px'
              }}>
                <Lightbulb size={20} style={{color: '#f093fb'}} />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  margin: 0,
                  color: '#ffffff'
                }}>
                  Smart Filter Suggestions
                </h3>
              </div>

              <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                {filterSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      minWidth: '250px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${suggestion.color}40`,
                      borderRadius: '12px',
                      padding: '15px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={suggestion.filterAction}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 8px 25px ${suggestion.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: suggestion.color,
                      margin: '0 0 8px 0'
                    }}>
                      {suggestion.title}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.8)',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {suggestion.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '10px',
                      fontSize: '11px',
                      color: suggestion.color,
                      fontWeight: '600'
                    }}>
                      <Filter size={12} />
                      Click to apply filter
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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

          {/* Toggleable Charts */}
          {showCharts && <Charts cryptoData={cryptoData} />}

          <CryptoTable filteredData={filteredData} cryptoData={cryptoData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;