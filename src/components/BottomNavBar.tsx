import React from 'react';
import {
  UtensilsCrossed,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Dumbbell,
} from 'lucide-react';
import type { TabType } from './Sidebar';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  brandPrimaryColor: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  brandPrimaryColor,
}) => {
  const tabs = [
    { id: 'ptcoach_diary' as TabType, label: 'Nutrición', icon: UtensilsCrossed },
    { id: 'grocery_list' as TabType, label: 'Súper', icon: ShoppingCart },
    { id: 'dashboard' as TabType, label: 'Resumen', icon: LayoutDashboard },
    { id: 'clients' as TabType, label: 'Atletas', icon: Users },
    { id: 'workouts' as TabType, label: 'Rutinas', icon: Dumbbell },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`bottom-nav-item ${isActive ? 'bottom-nav-active' : ''}`}
            style={isActive ? { color: brandPrimaryColor } : {}}
          >
            <Icon size={19} className="bottom-nav-icon" />
            <span className="bottom-nav-label">{tab.label}</span>
            {isActive && (
              <span
                className="bottom-nav-indicator"
                style={{ backgroundColor: brandPrimaryColor }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
