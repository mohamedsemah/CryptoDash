import React from 'react';
import { Globe, DollarSign, BarChart3, Star } from 'lucide-react';
import Sidebar from './Sidebar';
import LoadingScreen from './LoadingScreen';
import Charts from './Charts';
import CryptoTable from './CryptoTable';
import { containerStyle, formatPrice, formatMarketCap } from '../styles/commonStyles';

const Dashboard = ({
  cryptoData, filteredData, loading, error, fetchStatus, fetchProgress,
  searchQuery, setSearchQuery, priceFilter, setPriceFilter,
  marketCapFilter, setMarketCapFilter, changeFilter, setChangeFilter,
  customPriceMin, setCustomPriceMin, customPriceMax, setCustomPriceMax,
  volumeRange, setVolumeRange, showAdvancedFilters, setShowAdvancedFilters,
  clearAllFilters
}) => {

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

          <Charts cryptoData={cryptoData} />
          <CryptoTable filteredData={filteredData} cryptoData={cryptoData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;