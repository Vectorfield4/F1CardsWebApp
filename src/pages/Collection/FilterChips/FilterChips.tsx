import React from 'react';
import { Chip } from '@telegram-apps/telegram-ui';
import './FilterChips.css';

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ options, selectedId, onSelect }) => {
  return (
    <div className="filter-chips-container">
      {options.map((option) => (
        <Chip
          key={option.id}
          mode={selectedId === option.id ? 'elevated' : 'mono'}
          onClick={() => onSelect(option.id)}
          className={selectedId === option.id ? 'filter-chip-selected' : ''}
        >
          <span className={selectedId === option.id ? 'filter-chip-selected-text' : ''}>
            {option.label}
          </span>
        </Chip>
      ))}
    </div>
  );
}; 