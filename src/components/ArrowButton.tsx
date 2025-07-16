import React from 'react';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  style?: React.CSSProperties;
  alt?: string;
  ariaLabel?: string;
}

const arrowSrc = {
  left: 'https://s3.twcstorage.ru/1daee0b6-4b362c06-45a2-4fa0-b1aa-f30cd02cde29/icons/LArrow.svg',
  right: 'https://s3.twcstorage.ru/1daee0b6-4b362c06-45a2-4fa0-b1aa-f30cd02cde29/icons/RArrow.svg',
};

const defaultStyles: Record<'left' | 'right', React.CSSProperties> = {
  left: {
    position: 'absolute',
    width: '34px',
    height: '34px',
    left: '12px',
    marginLeft: '12px',
    cursor: 'pointer',
  },
  right: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    right: '12px',
    marginRight: '12px',
    cursor: 'pointer',
  },
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, style, alt, ariaLabel }) => (
  <img
    src={arrowSrc[direction]}
    alt={alt || (direction === 'left' ? 'Previous' : 'Next')}
    aria-label={ariaLabel || (direction === 'left' ? 'Previous' : 'Next')}
    onClick={onClick}
    style={{ ...defaultStyles[direction], ...style }}
  />
); 