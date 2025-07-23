import { useState, useEffect } from 'react';

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('');
  const [fetchProgress, setFetchProgress] = useState(0);

  const fetchWithRetry = async (url, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setFetchStatus(`📡 async/await: Calling CoinGecko API... (Attempt ${attempt}/${maxRetries})`);

        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.status === 429) {
          // Rate limited - wait longer
          setFetchStatus(`⏳ Rate limited, waiting ${delay * attempt}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (err) {
        if (attempt === maxRetries) {
          throw new Error(`Failed after ${maxRetries} attempts: ${err.message}`);
        }

        setFetchStatus(`❌ Attempt ${attempt} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setError(null);
        setFetchStatus('🚀 useEffect triggered - Starting data fetch...');
        setFetchProgress(10);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setFetchProgress(30);

        const response = await fetchWithRetry(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en'
        );

        setFetchStatus('⏳ await: Waiting for API response...');
        setFetchProgress(60);

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
        setError(`${err.message}. Please try refreshing the page or check your internet connection.`);
        setFetchProgress(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return { cryptoData, loading, error, fetchStatus, fetchProgress };
};