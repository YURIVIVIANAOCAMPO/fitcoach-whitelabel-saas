import React from 'react';
import {
  Menu,
  Search,
  Sparkles,
  FileCode2,
  RefreshCw,
  Sun,
  Moon,
} from 'lucide-react';
import type { BrandConfig } from '../types';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  brand: BrandConfig;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenWhiteLabel: () => void;
  onReloadXml: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  brand,
  searchTerm,
  onSearchChange,
  onOpenWhiteLabel,
  onReloadXml,
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
          <Search size={16} className="search-icon" />
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
        {/* XML Status Badge */}
        <div className="xml-status-badge">
          <FileCode2 size={14} className="text-brand" />
          <span className="xml-status-text">Datos XML Sincronizados</span>
        </div>

        {/* Refresh XML Button */}
        <button
          onClick={onReloadXml}
          className="header-icon-btn"
          title="Recargar base de datos XML"
        >
          <RefreshCw size={16} />
        </button>

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
            borderColor: `${brand.primaryColor}66`,
            backgroundColor: `${brand.primaryColor}15`,
            color: brand.primaryColor,
          }}
        >
          <Sparkles size={15} />
          <span className="whitelabel-btn-label">Personalizar Marca</span>
        </button>
      </div>
    </header>
  );
};
