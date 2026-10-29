import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Check,
  Search,
  Droplets,
  Utensils,
  Sun,
  Coffee,
  Moon,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';
import type { Client, MealType, FoodItem, BrandConfig } from '../types';
import { FITIA_FOOD_DATABASE, calculateMacrosForGrams, type FoodDatabaseItem } from '../data/foodDatabase';

interface FitiaDiaryViewProps {
  clients: Client[];
  activeClient: Client;
  onSelectClient: (clientId: string) => void;
  brand: BrandConfig;
  onToggleFoodCheck: (clientId: string, mealType: MealType, foodId: string) => void;
  onDeleteFood: (clientId: string, mealType: MealType, foodId: string) => void;
  onAddFoodToMeal: (clientId: string, mealType: MealType, newFood: FoodItem) => void;
  onUpdateWaterGlasses: (clientId: string, delta: number) => void;
  onTriggerToast: (msg: string, type?: 'success' | 'info') => void;
}

export const FitiaDiaryView: React.FC<FitiaDiaryViewProps> = ({
  clients,
  activeClient,
  onSelectClient,
  brand,
  onToggleFoodCheck,
  onDeleteFood,
  onAddFoodToMeal,
  onUpdateWaterGlasses,
  onTriggerToast,
}) => {
  const [modalMealType, setModalMealType] = useState<MealType | null>(null);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [selectedFoodDbItem, setSelectedFoodDbItem] = useState<FoodDatabaseItem | null>(null);
  const [portionGrams, setPortionGrams] = useState(100);

  // Calculate consumed totals from daily plan
  const dailyPlan = activeClient.dailyLog;

  let totalConsumedKcal = 0;
  let totalConsumedProtein = 0;
  let totalConsumedCarbs = 0;
  let totalConsumedFats = 0;

  dailyPlan.meals.forEach((meal) => {
    meal.foods.forEach((f) => {
      if (f.checked) {
        totalConsumedKcal += f.kcal;
        totalConsumedProtein += f.protein;
        totalConsumedCarbs += f.carbs;
        totalConsumedFats += f.fats;
      }
    });
  });

  const targetKcal = activeClient.nutrition.dailyCalories;
  const remainingKcal = targetKcal - totalConsumedKcal;
  const targetProtein = activeClient.nutrition.proteinGrams;
  const targetCarbs = activeClient.nutrition.carbsGrams;
  const targetFats = activeClient.nutrition.fatsGrams;

  const proteinRatio = Math.min(100, Math.round((totalConsumedProtein / targetProtein) * 100));
  const carbsRatio = Math.min(100, Math.round((totalConsumedCarbs / targetCarbs) * 100));
  const fatsRatio = Math.min(100, Math.round((totalConsumedFats / targetFats) * 100));
  const kcalRatio = Math.min(100, Math.round((totalConsumedKcal / targetKcal) * 100));

  // Filter foods for modal
  const filteredDbFoods = FITIA_FOOD_DATABASE.filter((f) =>
    f.name.toLowerCase().includes(foodSearchQuery.toLowerCase())
  );

  const handleOpenAddFoodModal = (mealType: MealType) => {
    setModalMealType(mealType);
    setSelectedFoodDbItem(FITIA_FOOD_DATABASE[0]);
    setPortionGrams(FITIA_FOOD_DATABASE[0].defaultGrams);
    setFoodSearchQuery('');
  };

  const handleSelectDbFood = (item: FoodDatabaseItem) => {
    setSelectedFoodDbItem(item);
    setPortionGrams(item.defaultGrams);
  };

  const handleConfirmAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalMealType || !selectedFoodDbItem) return;

    const macros = calculateMacrosForGrams(selectedFoodDbItem, portionGrams);
    const newFood: FoodItem = {
      id: `f-${Date.now()}`,
      name: selectedFoodDbItem.name,
      category: selectedFoodDbItem.category,
      grams: portionGrams,
      kcal: macros.kcal,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
      checked: true,
    };

    onAddFoodToMeal(activeClient.id, modalMealType, newFood);
    onTriggerToast(`Agregado a ${modalMealType}: ${newFood.name} (${newFood.grams}g)`, 'success');
    setModalMealType(null);
  };

  const getMealIcon = (type: MealType) => {
    switch (type) {
      case 'breakfast':
        return <Sun size={17} className="text-amber-400" />;
      case 'lunch':
        return <Utensils size={17} className="text-emerald-400" />;
      case 'snack':
        return <Coffee size={17} className="text-indigo-400" />;
      case 'dinner':
        return <Moon size={17} className="text-blue-400" />;
    }
  };

  const liveCalculatedMacros = selectedFoodDbItem
    ? calculateMacrosForGrams(selectedFoodDbItem, portionGrams)
    : null;

  return (
    <div className="fitia-diary-container">
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
                  {c.fullName} • {c.goal === 'fat_loss' ? 'Definición' : c.goal === 'hypertrophy' ? 'Hipertrofia' : 'Fuerza'} ({c.nutrition.dailyCalories} kcal)
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="select-chevron" />
          </div>
        </div>

        <div className="fitia-date-badge">
          <span>Hoy • Plan Fitia Diario Sincronizado</span>
        </div>
      </div>

      {/* Hero Fitia Calories & Macros Card */}
      <div className="fitia-macro-card">
        <div className="fitia-macro-header">
          <div className="fitia-cal-circle">
            <svg viewBox="0 0 100 100" className="cal-svg-ring">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--bg-subtle)"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={brand.primaryColor}
                strokeWidth="7"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * kcalRatio) / 100}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="cal-ring-progress"
              />
            </svg>
            <div className="cal-center-text">
              <span className="cal-number">{remainingKcal > 0 ? remainingKcal : 0}</span>
              <span className="cal-label">Restantes</span>
            </div>
          </div>

          <div className="fitia-macro-breakdown">
            <div className="cal-equation-row">
              <div className="equation-item">
                <span className="eq-label">Meta</span>
                <span className="eq-val font-semibold">{targetKcal}</span>
              </div>
              <span className="eq-sign">-</span>
              <div className="equation-item">
                <span className="eq-label">Consumidas</span>
                <span className="eq-val text-brand font-semibold">{totalConsumedKcal}</span>
              </div>
              <span className="eq-sign">=</span>
              <div className="equation-item">
                <span className="eq-label">Restantes</span>
                <span className="eq-val text-primary font-bold">{remainingKcal} kcal</span>
              </div>
            </div>

            {/* 3 Macro Progress Bars */}
            <div className="fitia-bars-list">
              {/* Protein */}
              <div className="fitia-bar-group">
                <div className="bar-label-row">
                  <span className="bar-name text-cyan-400">Proteínas</span>
                  <span className="bar-numbers">
                    <strong>{Math.round(totalConsumedProtein)}</strong> / {targetProtein}g
                  </span>
                </div>
                <div className="fitia-bar-track">
                  <div
                    className="fitia-bar-fill fill-protein"
                    style={{ width: `${proteinRatio}%` }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div className="fitia-bar-group">
                <div className="bar-label-row">
                  <span className="bar-name text-amber-400">Carbohidratos</span>
                  <span className="bar-numbers">
                    <strong>{Math.round(totalConsumedCarbs)}</strong> / {targetCarbs}g
                  </span>
                </div>
                <div className="fitia-bar-track">
                  <div
                    className="fitia-bar-fill fill-carbs"
                    style={{ width: `${carbsRatio}%` }}
                  />
                </div>
              </div>

              {/* Fats */}
              <div className="fitia-bar-group">
                <div className="bar-label-row">
                  <span className="bar-name text-rose-400">Grasas</span>
                  <span className="bar-numbers">
                    <strong>{Math.round(totalConsumedFats)}</strong> / {targetFats}g
                  </span>
                </div>
                <div className="fitia-bar-track">
                  <div
                    className="fitia-bar-fill fill-fats"
                    style={{ width: `${fatsRatio}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fitia Water Intake Tracker */}
        <div className="fitia-water-tracker">
          <div className="water-left">
            <div className="water-icon-circle">
              <Droplets size={18} className="text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-sm">Hidratación Diaria Fitia</div>
              <div className="text-xs text-muted">
                {dailyPlan.waterGlasses * 250} ml consumidos de {dailyPlan.targetWaterGlasses * 250} ml recomendados
              </div>
            </div>
          </div>

          <div className="water-controls">
            <button
              onClick={() => onUpdateWaterGlasses(activeClient.id, -1)}
              className="btn-water-step"
              title="Quitar vaso (-250ml)"
            >
              -
            </button>
            <div className="water-glasses-count">
              <span className="font-bold text-cyan-400">{dailyPlan.waterGlasses}</span> / {dailyPlan.targetWaterGlasses} vasos
            </div>
            <button
              onClick={() => onUpdateWaterGlasses(activeClient.id, 1)}
              className="btn-water-step"
              title="Agregar vaso (+250ml)"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 4 Meals of the Day */}
      <div className="fitia-meals-container">
        {dailyPlan.meals.map((meal) => {
          const mealConsumedKcal = meal.foods.reduce((sum, f) => (f.checked ? sum + f.kcal : sum), 0);
          const mealTotalKcal = meal.foods.reduce((sum, f) => sum + f.kcal, 0);

          return (
            <div key={meal.id} className="fitia-meal-card">
              <div className="fitia-meal-header">
                <div className="flex items-center gap-2">
                  <div className="meal-icon-box">{getMealIcon(meal.type)}</div>
                  <div>
                    <h3 className="meal-title">{meal.name}</h3>
                    <div className="meal-kcal-meta">
                      Consumido: <span className="text-brand font-semibold">{mealConsumedKcal} kcal</span> • Planificado: {mealTotalKcal} kcal
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddFoodModal(meal.type)}
                  className="btn-add-food"
                  style={{ color: brand.primaryColor, borderColor: `${brand.primaryColor}55` }}
                >
                  <Plus size={14} />
                  <span>Agregar Alimento</span>
                </button>
              </div>

              {/* Foods List inside Meal */}
              <div className="fitia-foods-list">
                {meal.foods.length === 0 ? (
                  <div className="empty-meal-slot">
                    No hay alimentos registrados en este tiempo de comida. Haz clic en "Agregar Alimento" para prescribir o registrar.
                  </div>
                ) : (
                  meal.foods.map((food) => (
                    <div
                      key={food.id}
                      className={`fitia-food-row ${food.checked ? 'food-row-checked' : ''}`}
                    >
                      <button
                        onClick={() => onToggleFoodCheck(activeClient.id, meal.type, food.id)}
                        className={`food-checkbox ${food.checked ? 'food-checkbox-checked' : ''}`}
                        style={food.checked ? { backgroundColor: brand.primaryColor, borderColor: brand.primaryColor } : {}}
                      >
                        {food.checked && <Check size={12} className="text-black font-bold" />}
                      </button>

                      <div className="food-info-flex">
                        <div className="food-name-row">
                          <span className={`food-name ${food.checked ? 'text-primary' : 'text-muted'}`}>
                            {food.name}
                          </span>
                          <span className="food-portion font-mono text-xs text-muted">
                            {food.grams}g
                          </span>
                        </div>
                        <div className="food-macros-row">
                          <span className="food-kcal font-semibold text-brand">{food.kcal} kcal</span>
                          <span className="macro-chip text-cyan-400">P: {food.protein}g</span>
                          <span className="macro-chip text-amber-400">C: {food.carbs}g</span>
                          <span className="macro-chip text-rose-400">G: {food.fats}g</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteFood(activeClient.id, meal.type, food.id)}
                        className="btn-delete-food"
                        title="Eliminar alimento de la comida"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Smart Food Search & Grams Calculator (Fitia Style) */}
      {modalMealType && (
        <div className="modal-backdrop">
          <div className="modal-card modal-card-lg">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Utensils size={18} style={{ color: brand.primaryColor }} />
                <h3 className="modal-title">
                  Agregar a {modalMealType === 'breakfast' ? 'Desayuno' : modalMealType === 'lunch' ? 'Almuerzo' : modalMealType === 'snack' ? 'Merienda' : 'Cena'}
                </h3>
              </div>
              <button onClick={() => setModalMealType(null)} className="modal-close">
                <X size={18} />
              </button>
            </div>

            <div className="modal-fitia-food-layout">
              {/* Left Column: Food Search List */}
              <div className="food-search-col">
                <div className="search-bar mb-2">
                  <Search size={15} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar pollo, avena, huevo, arroz..."
                    value={foodSearchQuery}
                    onChange={(e) => setFoodSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                </div>

                <div className="food-db-scroll">
                  {filteredDbFoods.map((item) => {
                    const isSelected = selectedFoodDbItem?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectDbFood(item)}
                        className={`food-db-item ${isSelected ? 'food-db-item-selected' : ''}`}
                        style={isSelected ? { borderColor: brand.primaryColor, backgroundColor: `${brand.primaryColor}14` } : {}}
                      >
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-xs text-muted">
                          {item.servingLabel} • {item.kcalPer100g} kcal / 100g
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Portion Adjustment & Real-Time Macro preview */}
              {selectedFoodDbItem && (
                <form onSubmit={handleConfirmAddFood} className="food-portion-col">
                  <div className="portion-box-header">
                    <h4 className="font-bold text-base text-primary">{selectedFoodDbItem.name}</h4>
                    <span className="text-xs text-muted">Ajusta los gramos para calcular automáticamente</span>
                  </div>

                  <div className="form-group my-3">
                    <label className="form-label flex justify-between">
                      <span>Cantidad en Gramos (g)</span>
                      <span className="font-mono text-brand font-bold">{portionGrams} gramos</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={portionGrams}
                      onChange={(e) => setPortionGrams(parseInt(e.target.value, 10))}
                      className="fitia-slider"
                    />
                    <div className="flex gap-2 mt-2">
                      {[50, 100, 150, 200, 250].map((quickGrams) => (
                        <button
                          key={quickGrams}
                          type="button"
                          onClick={() => setPortionGrams(quickGrams)}
                          className={`btn-quick-gram ${portionGrams === quickGrams ? 'quick-gram-active' : ''}`}
                        >
                          {quickGrams}g
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Real-time macro calculated card */}
                  {liveCalculatedMacros && (
                    <div className="live-macro-calc-card">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted font-semibold uppercase">Aporte Nutricional</span>
                        <span className="font-bold text-brand text-lg">{liveCalculatedMacros.kcal} kcal</span>
                      </div>
                      <div className="macros-grid">
                        <div className="macro-card">
                          <span className="macro-name text-cyan-400">Proteínas</span>
                          <span className="macro-val">{liveCalculatedMacros.protein}g</span>
                        </div>
                        <div className="macro-card">
                          <span className="macro-name text-amber-400">Carbos</span>
                          <span className="macro-val">{liveCalculatedMacros.carbs}g</span>
                        </div>
                        <div className="macro-card">
                          <span className="macro-name text-rose-400">Grasas</span>
                          <span className="macro-val">{liveCalculatedMacros.fats}g</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="modal-footer mt-auto">
                    <button
                      type="button"
                      onClick={() => setModalMealType(null)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-brand">
                      <Sparkles size={16} />
                      <span>Agregar al Menú</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
