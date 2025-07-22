import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CoinDetail from './components/CoinDetail';
import { useCryptoData } from './hooks/useCryptoData';
import { useFilters } from './hooks/useFilters';

const App = () => {
  const { cryptoData, loading, error, fetchStatus, fetchProgress } = useCryptoData();
  const {
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
  } = useFilters(cryptoData);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={
          <Dashboard
            cryptoData={cryptoData}
            filteredData={filteredData}
            loading={loading}
            error={error}
            fetchStatus={fetchStatus}
            fetchProgress={fetchProgress}
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
        } />
        <Route path="/coin/:id" element={<CoinDetail cryptoData={cryptoData} />} />
      </Routes>
    </Router>
  );
};

export default App;