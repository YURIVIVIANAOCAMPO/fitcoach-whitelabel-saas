import React from 'react';
import {
  UtensilsCrossed,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Dumbbell,
  Sparkles,
  Flame,
  Zap,
  Trophy,
  Crown,
  Activity,
  LogOut,
  ChevronRight,
  Globe,
} from 'lucide-react';
import type { BrandConfig } from '../types';

export type TabType =
  | 'ptcoach_diary'
  | 'grocery_list'
  | 'dashboard'
  | 'clients'
  | 'workouts';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  brand: BrandConfig;
  clientCount: number;
  onOpenWhiteLabel: () => void;
  onLogout: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  brand,
  clientCount,
  onOpenWhiteLabel,
  onLogout,
  isOpen,
  onCloseMobile,
}) => {
  const renderLogoIcon = () => {
    switch (brand.logoIcon) {
      case 'dumbbell':
        return <Dumbbell size={19} />;
      case 'flame':
        return <Flame size={19} />;
      case 'zap':
        return <Zap size={19} />;
      case 'trophy':
        return <Trophy size={19} />;
      case 'crown':
        return <Crown size={19} />;
      case 'activity':
      default:
        return <Activity size={19} />;
    }
  };

  const navItems = [
    {
      id: 'ptcoach_diary' as TabType,
      label: 'Nutrición & Macros',
      icon: UtensilsCrossed,
      badge: 'Diario',
    },
    {
      id: 'grocery_list' as TabType,
      label: 'Lista de Compras',
      icon: ShoppingCart,
      badge: null,
    },
    {
      id: 'dashboard' as TabType,
      label: 'Resumen General',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'clients' as TabType,
      label: 'Mis Atletas',
      icon: Users,
      badge: clientCount,
    },
    {
      id: 'workouts' as TabType,
      label: 'Rutinas & Ejercicios',
      icon: Dumbbell,
      badge: null,
    },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onCloseMobile} />}

      <aside className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div
            className="brand-icon-box"
            style={{
              backgroundColor: brand.primaryColor,
              boxShadow: `0 4px 14px ${brand.primaryColor}40`,
            }}
          >
            {renderLogoIcon()}
          </div>
          <div className="brand-text">
            <div className="brand-name">{brand.brandName}</div>
            <span className="brand-sub">{brand.coachName}</span>
          </div>
        </div>

        {/* Subdomain pill */}
        <div className="subdomain-pill">
          <Globe size={13} className="text-brand" />
          <span className="subdomain-text">{brand.subdomain}</span>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          <div className="nav-group-title">Módulos de Gestión</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${brand.primaryColor}14`,
                        color: brand.primaryColor,
                        borderLeftColor: brand.primaryColor,
                      }
                    : {}
                }
              >
                <div className="nav-item-left">
                  <Icon size={18} className="nav-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className="nav-badge"
                    style={
                      item.badge === 'Diario'
                        ? { backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }
                        : {}
                    }
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="nav-arrow" />}
              </button>
            );
          })}
        </nav>

        {/* White-Label Customization CTA Button */}
        <div className="sidebar-whitelabel-cta">
          <button
            onClick={() => {
              onOpenWhiteLabel();
              onCloseMobile();
            }}
            className="btn-whitelabel-trigger"
            style={{
              borderColor: `${brand.primaryColor}40`,
              backgroundColor: `${brand.primaryColor}0d`,
            }}
          >
            <Sparkles size={16} style={{ color: brand.primaryColor }} />
            <div className="text-left">
              <div className="font-semibold text-xs" style={{ color: brand.primaryColor }}>
                Marca Blanca
              </div>
              <div className="text-muted text-[10px]">Personalizar Colores &amp; Marca</div>
            </div>
          </button>
        </div>

        {/* Bottom Trainer User Card */}
        <div className="sidebar-footer">
          <div className="trainer-user-bar">
            <div
              className="trainer-avatar"
              style={{ backgroundColor: brand.primaryColor }}
            >
              {brand.coachName
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="trainer-info">
              <span className="trainer-name">{brand.coachName}</span>
              <span className="trainer-role">Entrenador Demo</span>
            </div>
            <button
              onClick={onLogout}
              className="btn-logout"
              title="Cerrar Sesión Demo"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
