import React from 'react';
import {
  Menu,
  Search,
  Sparkles,
  Sun,
  Moon,
  Activity,
} from 'lucide-react';
import type { BrandConfig } from '../types';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  brand: BrandConfig;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenWhiteLabel: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  brand,
  searchTerm,
  onSearchChange,
  onOpenWhiteLabel,
  isDarkTheme,
  onToggleTheme,
}) => {
  return (
    <header className="header-container">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Abrir menú de navegación"
        >
          <Menu size={20} />
        </button>

        <div className="search-bar">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar atletas por nombre, objetivo o email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="clear-search-btn"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Status indicator */}
        <div className="system-live-pill">
          <Activity size={13} className="text-brand animate-pulse" />
          <span className="text-xs text-secondary font-medium">PTcoach Activo</span>
        </div>

        {/* Dark/Light mode toggle */}
        <button
          onClick={onToggleTheme}
          className="header-icon-btn"
          title={isDarkTheme ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDarkTheme ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* White-Label Quick Button */}
        <button
          onClick={onOpenWhiteLabel}
          className="btn-header-whitelabel"
          style={{
            borderColor: `${brand.primaryColor}55`,
            backgroundColor: `${brand.primaryColor}12`,
            color: brand.primaryColor,
          }}
        >
          <Sparkles size={14} />
          <span className="whitelabel-btn-label">Personalizar Marca</span>
        </button>
      </div>
    </header>
  );
};
