import { useState, useEffect } from 'react';

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('');
  const [fetchProgress, setFetchProgress] = useState(0);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setFetchStatus('🚀 useEffect triggered - Starting data fetch...');
        setFetchProgress(10);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setFetchStatus('📡 async/await: Calling CoinGecko API...');
        setFetchProgress(30);

        // Use proxy URL to avoid CORS issues
        const response = await fetch('/api/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en');

        setFetchStatus('⏳ await: Waiting for API response...');
        setFetchProgress(60);

        if (!response.ok) throw new Error('Failed to fetch data');

        setFetchStatus('📊 await: Processing JSON data...');
        setFetchProgress(80);

        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 500));

        setFetchStatus('✅ async/await complete - Data loaded!');
        setFetchProgress(100);
        setCryptoData(data);

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

  return { cryptoData, loading, error, fetchStatus, fetchProgress };
};