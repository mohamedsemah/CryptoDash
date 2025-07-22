export const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
  color: '#ffffff',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  padding: '0'
};

export const cardStyle = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: '25px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease'
};

export const inputStyle = {
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

export const formatPrice = (price) => {
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString()}`;
};

export const formatMarketCap = (marketCap) => {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
};

export const formatNumber = (num) => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toLocaleString();
};