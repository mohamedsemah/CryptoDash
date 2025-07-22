import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatMarketCap } from '../styles/commonStyles';

const CryptoTable = ({ filteredData, cryptoData }) => {
  return (
    <>
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
            {filteredData.map((coin) => (
              <tr
                key={coin.id}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
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
                  <Link
                    to={`/coin/${coin.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
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
                  </Link>
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
    </>
  );
};

export default CryptoTable;