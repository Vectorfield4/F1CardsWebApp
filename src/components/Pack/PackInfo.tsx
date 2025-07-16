import React from 'react';

interface CardSet {
  id: string;
  name: string;
}

interface PackInfoProps {
  pack: CardSet;
}

const packInfoStyles = {
  container: {
    textAlign: 'center' as const,
    padding: '8px',
  },
  name: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  id: {
    color: '#888',
    fontSize: '12px',
    marginTop: '4px',
  },
};

export const PackInfo: React.FC<PackInfoProps> = ({ pack }) => {
  return (
    <div style={packInfoStyles.container}>
      <h3 style={packInfoStyles.name}>{pack.name}</h3>
      <div style={packInfoStyles.id}>ID: {pack.id}</div>
    </div>
  );
};
