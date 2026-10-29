import React, { useState } from 'react';
import {
  ShoppingCart,
  Check,
  Share2,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import type { Client, BrandConfig } from '../types';

interface GroceryListViewProps {
  clients: Client[];
  activeClient: Client;
  onSelectClient: (clientId: string) => void;
  brand: BrandConfig;
  onTriggerToast: (msg: string, type?: 'success' | 'info') => void;
}

interface AggregatedGroceryItem {
  id: string;
  name: string;
  category: 'Carnes & Proteínas' | 'Cereales & Granos' | 'Frutas & Verduras' | 'Lácteos & Grasas';
  totalGrams: number;
}

export const GroceryListView: React.FC<GroceryListViewProps> = ({
  clients,
  activeClient,
  onSelectClient,
  brand,
  onTriggerToast,
}) => {
  const [checkedItemIds, setCheckedItemIds] = useState<Record<string, boolean>>({});

  // Group and sum all foods from the client's meals
  const aggregatedMap: Record<string, AggregatedGroceryItem> = {};

  activeClient.dailyLog.meals.forEach((meal) => {
    meal.foods.forEach((food) => {
      let cat: AggregatedGroceryItem['category'] = 'Carnes & Proteínas';
      if (food.category === 'carb') cat = 'Cereales & Granos';
      else if (food.category === 'fruit' || food.category === 'vegetable') cat = 'Frutas & Verduras';
      else if (food.category === 'fat' || food.category === 'dairy') cat = 'Lácteos & Grasas';

      const key = food.name.toLowerCase().trim();
      if (!aggregatedMap[key]) {
        aggregatedMap[key] = {
          id: `groc-${key.replace(/\s+/g, '-')}`,
          name: food.name,
          category: cat,
          totalGrams: food.grams,
        };
      } else {
        aggregatedMap[key].totalGrams += food.grams;
      }
    });
  });

  const allItems = Object.values(aggregatedMap);

  const toggleCheck = (id: string) => {
    setCheckedItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyWhatsappList = () => {
    let text = `🛒 *LISTA DE COMPRAS SEMANAL - PTCOACH*\n`;
    text += `👤 *Atleta:* ${activeClient.fullName}\n`;
    text += `🏋️ *Entrenador:* ${brand.coachName} (${brand.brandName})\n`;
    text += `📅 *Generada para:* 7 días estimados\n\n`;

    const categories = ['Carnes & Proteínas', 'Cereales & Granos', 'Frutas & Verduras', 'Lácteos & Grasas'] as const;

    categories.forEach((cat) => {
      const catItems = allItems.filter((i) => i.category === cat);
      if (catItems.length > 0) {
        text += `*${cat.toUpperCase()}*\n`;
        catItems.forEach((item) => {
          // Multiply daily amount by 7 for weekly grocery
          const weeklyAmount = Math.round((item.totalGrams * 7) / 10) * 10;
          text += `  • ${item.name}: ~${weeklyAmount >= 1000 ? `${(weeklyAmount / 1000).toFixed(1)} kg` : `${weeklyAmount} g`}\n`;
        });
        text += `\n`;
      }
    });

    text += `💧 Agua recomendada: ${activeClient.nutrition.waterLiters}L / día\n`;
    text += `✨ Prescrito con ${brand.brandName} (${brand.subdomain})`;

    navigator.clipboard?.writeText(text);
    onTriggerToast('Lista de compras copiada con formato para WhatsApp', 'success');
  };

  const categories = ['Carnes & Proteínas', 'Cereales & Granos', 'Frutas & Verduras', 'Lácteos & Grasas'] as const;
  const totalCompleted = Object.values(checkedItemIds).filter(Boolean).length;

  return (
    <div className="grocery-container">
      {/* Client Switcher Banner */}
      <div className="fitia-client-selector-bar">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted uppercase font-semibold">Atleta Activo:</span>
          <div className="relative-container">
            <select
              value={activeClient.id}
              onChange={(e) => onSelectClient(e.target.value)}
              className="fitia-client-select"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.fullName} • Plan de Compras
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="select-chevron" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleCopyWhatsappList} className="btn-brand text-xs">
            <Share2 size={14} />
            <span>Compartir por WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Hero Grocery Info */}
      <div className="grocery-hero-card">
        <div className="flex items-center gap-3">
          <div className="grocery-icon-circle" style={{ backgroundColor: `${brand.primaryColor}25`, color: brand.primaryColor }}>
            <ShoppingCart size={24} />
          </div>
          <div>
            <h1 className="section-title">Lista de Compras Inteligente PTcoach</h1>
            <p className="section-desc">
              Cantidades calculadas automáticamente a partir de las 4 comidas del atleta {activeClient.fullName}.
            </p>
          </div>
        </div>

        <div className="grocery-progress-badge">
          <CheckCircle2 size={16} className="text-brand" />
          <span>
            {totalCompleted} de {allItems.length} artículos comprados
          </span>
        </div>
      </div>

      {/* Grocery Aisles Categories */}
      <div className="grocery-aisles-grid">
        {categories.map((cat) => {
          const catItems = allItems.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="card-panel grocery-aisle-panel">
              <div className="aisle-header">
                <h3 className="aisle-title">{cat}</h3>
                <span className="badge-tag" style={{ backgroundColor: `${brand.primaryColor}18`, color: brand.primaryColor }}>
                  {catItems.length} ingredientes
                </span>
              </div>

              <div className="grocery-items-list">
                {catItems.map((item) => {
                  const isChecked = Boolean(checkedItemIds[item.id]);
                  const weeklyGrams = item.totalGrams * 7;
                  const displayGrams =
                    weeklyGrams >= 1000
                      ? `${(weeklyGrams / 1000).toFixed(1)} kg`
                      : `${weeklyGrams} g`;

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`grocery-item-row ${isChecked ? 'grocery-item-checked' : ''}`}
                    >
                      <button
                        type="button"
                        className={`food-checkbox ${isChecked ? 'food-checkbox-checked' : ''}`}
                        style={isChecked ? { backgroundColor: brand.primaryColor, borderColor: brand.primaryColor } : {}}
                      >
                        {isChecked && <Check size={12} className="text-black font-bold" />}
                      </button>

                      <div className="flex-1">
                        <span className={`grocery-item-name ${isChecked ? 'line-through text-muted' : 'text-primary'}`}>
                          {item.name}
                        </span>
                      </div>

                      <div className="grocery-qty-badge">
                        <span>{displayGrams}</span>
                        <span className="text-[10px] text-muted">/ sem</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
