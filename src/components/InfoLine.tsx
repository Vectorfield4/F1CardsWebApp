import React from 'react';

export const InfoLine = ({ 
  label, 
  value, 
  icon 
}: { 
  label: string, 
  value: number|string, 
  icon: React.ReactNode 
}) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    paddingTop: '16px', 
    marginBottom: '0 0', 
    borderTop: '1px solid #444' 
  }}>
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px' 
    }}>
      {icon}
      {label}
    </div>
    <div style={{ textAlign: 'right', fontWeight: 'bold' }}>{value}</div>
  </div>
); 