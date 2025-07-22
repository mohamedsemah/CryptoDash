import React from 'react';
import { containerStyle, cardStyle } from '../styles/commonStyles';

const LoadingScreen = ({ fetchStatus, fetchProgress }) => {
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
};

export default LoadingScreen;