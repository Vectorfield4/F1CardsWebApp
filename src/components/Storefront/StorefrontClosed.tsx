import React from 'react';
import { Lock } from 'lucide-react';

export const StorefrontClosed: React.FC = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    color: '#888',
    gap: '16px',
  }}>
    <Lock size={48} />
    <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>
      Витрина временно недоступна
    </div>
    <div style={{ fontSize: '1rem', color: '#aaa' }}>
      Попробуйте зайти позже или обратитесь в поддержку.
    </div>
  </div>
); 