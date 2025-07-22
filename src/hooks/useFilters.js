import { useState, useEffect } from 'react';

export const useFilters = (cryptoData) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [marketCapFilter, setMarketCapFilter] = useState('all');
  const [changeFilter, setChangeFilter] = useState('all');
  const [customPriceMin, setCustomPriceMin] = useState('');
  const [customPriceMax, setCustomPriceMax] = useState('');
  const [volumeRange, setVolumeRange] = useState([0, 100]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    let filtered = cryptoData;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(coin => {
        if (priceFilter === 'under1') return coin.current_price < 1;
        if (priceFilter === '1to100') return coin.current_price >= 1 && coin.current_price <= 100;
        if (priceFilter === '100to1000') return coin.current_price > 100 && coin.current_price <= 1000;
        if (priceFilter === 'over1000') return coin.current_price > 1000;
        return true;
      });
    }

    // Custom price range
    if (customPriceMin !== '' || customPriceMax !== '') {
      filtered = filtered.filter(coin => {
        const price = coin.current_price;
        const minPrice = customPriceMin === '' ? 0 : parseFloat(customPriceMin);
        const maxPrice = customPriceMax === '' ? Infinity : parseFloat(customPriceMax);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Market cap filter
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

    // Change filter
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

    // Volume range filter
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

  const clearAllFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setCustomPriceMin('');
    setCustomPriceMax('');
    setMarketCapFilter('all');
    setChangeFilter('all');
    setVolumeRange([0, 100]);
  };

  return {
    filteredData,
    searchQuery, setSearchQuery,
    priceFilter, setPriceFilter,
    marketCapFilter, setMarketCapFilter,
    changeFilter, setChangeFilter,
    customPriceMin, setCustomPriceMin,
    customPriceMax, setCustomPriceMax,
    volumeRange, setVolumeRange,
    showAdvancedFilters, setShowAdvancedFilters,
    clearAllFilters
  };
};