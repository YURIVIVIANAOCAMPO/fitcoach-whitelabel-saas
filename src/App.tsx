import { useState, useEffect, useTransition } from 'react';
import type {
  BrandConfig,
  WorkoutRoutine,
  Client,
  ClientStatus,
  PaymentStatus,
  MealType,
  FoodItem,
} from './types';
import {
  loadDatabaseFromStorage,
  saveDatabaseToStorage,
  serializeFitCoachToXml,
} from './services/xmlService';
import { Sidebar, type TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { PTcoachDiaryView } from './components/PTcoachDiaryView';
import { GroceryListView } from './components/GroceryListView';
import { DashboardView } from './components/DashboardView';
import { ClientsView } from './components/ClientsView';
import { WorkoutsView } from './components/WorkoutsView';
import { BottomNavBar } from './components/BottomNavBar';
import { WhiteLabelSettingsModal } from './components/WhiteLabelSettingsModal';
import { LoginDemoModal } from './components/LoginDemoModal';
import { ToastContainer, type ToastMessage } from './components/Toast';
import './App.css';

export default function App() {
  const [initialData] = useState(() => loadDatabaseFromStorage());

  const [brand, setBrand] = useState<BrandConfig>(initialData.brand);
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(initialData.routines);
  const [clients, setClients] = useState<Client[]>(initialData.clients);
  const [, setCurrentXml] = useState<string>(initialData.rawXml);

  const [activeClientId, setActiveClientId] = useState<string>(
    initialData.clients[0]?.id || ''
  );

  const [currentTab, setCurrentTab] = useState<TabType>('ptcoach_diary');
  const [searchTerm, setSearchTerm] = useState('');
  const [isWhiteLabelModalOpen, setIsWhiteLabelModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem('fitcoach_theme') !== 'light';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [, startTransition] = useTransition();

  const activeClient = clients.find((c) => c.id === activeClientId) || clients[0];

  // Apply theme & brand primary color to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    document.documentElement.style.setProperty('--color-brand-primary', brand.primaryColor);
    document.documentElement.style.setProperty('--color-brand-primary-rgb', brand.primaryColor);
    localStorage.setItem('fitcoach_theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme, brand.primaryColor]);

  // Synchronize state changes to XML and local storage
  const syncToXmlAndStorage = (
    updatedBrand: BrandConfig,
    updatedRoutines: WorkoutRoutine[],
    updatedClients: Client[]
  ) => {
    const newXml = serializeFitCoachToXml(updatedBrand, updatedRoutines, updatedClients);
    setCurrentXml(newXml);
    saveDatabaseToStorage(newXml);
  };

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fitia Daily Food Check Toggle
  const handleToggleFoodCheck = (clientId: string, mealType: MealType, foodId: string) => {
    const updated = clients.map((c) => {
      if (c.id !== clientId) return c;
      const updatedMeals = c.dailyLog.meals.map((m) => {
        if (m.type !== mealType) return m;
        return {
          ...m,
          foods: m.foods.map((f) => (f.id === foodId ? { ...f, checked: !f.checked } : f)),
        };
      });
      return {
        ...c,
        dailyLog: {
          ...c.dailyLog,
          meals: updatedMeals,
        },
      };
    });
    setClients(updated);
    syncToXmlAndStorage(brand, routines, updated);
  };

  // Fitia Delete Food from Meal
  const handleDeleteFood = (clientId: string, mealType: MealType, foodId: string) => {
    const updated = clients.map((c) => {
      if (c.id !== clientId) return c;
      const updatedMeals = c.dailyLog.meals.map((m) => {
        if (m.type !== mealType) return m;
        return {
          ...m,
          foods: m.foods.filter((f) => f.id !== foodId),
        };
      });
      return {
        ...c,
        dailyLog: {
          ...c.dailyLog,
          meals: updatedMeals,
        },
      };
    });
    setClients(updated);
    syncToXmlAndStorage(brand, routines, updated);
    triggerToast('Alimento eliminado del plan diario', 'info');
  };

  // Fitia Add Food to Meal
  const handleAddFoodToMeal = (clientId: string, mealType: MealType, newFood: FoodItem) => {
    const updated = clients.map((c) => {
      if (c.id !== clientId) return c;
      const updatedMeals = c.dailyLog.meals.map((m) => {
        if (m.type !== mealType) return m;
        return {
          ...m,
          foods: [...m.foods, newFood],
        };
      });
      return {
        ...c,
        dailyLog: {
          ...c.dailyLog,
          meals: updatedMeals,
        },
      };
    });
    setClients(updated);
    syncToXmlAndStorage(brand, routines, updated);
  };

  // Fitia Water intake
  const handleUpdateWaterGlasses = (clientId: string, delta: number) => {
    const updated = clients.map((c) => {
      if (c.id !== clientId) return c;
      const newGlasses = Math.max(0, Math.min(30, c.dailyLog.waterGlasses + delta));
      return {
        ...c,
        dailyLog: {
          ...c.dailyLog,
          waterGlasses: newGlasses,
        },
      };
    });
    setClients(updated);
    syncToXmlAndStorage(brand, routines, updated);
  };

  // Client handlers
  const handleAddClient = (newClient: Client) => {
    const updated = [newClient, ...clients];
    setClients(updated);
    setActiveClientId(newClient.id);
    syncToXmlAndStorage(brand, routines, updated);
  };

  const handleUpdateClientStatus = (clientId: string, status: ClientStatus) => {
    const updated = clients.map((c) => (c.id === clientId ? { ...c, status } : c));
    setClients(updated);
    syncToXmlAndStorage(brand, routines, updated);
  };

  const handleUpdatePaymentStatus = (clientId: string, paymentStatus: PaymentStatus) => {
    const updated = clients.map((c) => (c.id === clientId ? { ...c, paymentStatus } : c));
    setClients(updated);
    syncToXmlAndStorage(brand, routines, updated);
  };

  const handleDeleteClient = (clientId: string) => {
    const updated = clients.filter((c) => c.id !== clientId);
    setClients(updated);
    if (activeClientId === clientId && updated.length > 0) {
      setActiveClientId(updated[0].id);
    }
    syncToXmlAndStorage(brand, routines, updated);
  };

  // Routine handler
  const handleAddRoutine = (newRoutine: WorkoutRoutine) => {
    const updated = [...routines, newRoutine];
    setRoutines(updated);
    syncToXmlAndStorage(brand, updated, clients);
  };

  // White label brand save
  const handleSaveBrand = (newBrand: BrandConfig) => {
    setBrand(newBrand);
    syncToXmlAndStorage(newBrand, routines, clients);
    triggerToast(`Marca blanca actualizada: ${newBrand.brandName}`, 'success');
  };

  return (
    <div className="app-layout">
      {/* Sidebar with White-label Brand Customization */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          startTransition(() => {
            setCurrentTab(tab);
          });
        }}
        brand={brand}
        clientCount={clients.length}
        onOpenWhiteLabel={() => setIsWhiteLabelModalOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
        isOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          brand={brand}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenWhiteLabel={() => setIsWhiteLabelModalOpen(true)}
          isDarkTheme={isDarkTheme}
          onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        />

        <main className="content-body">
          {currentTab === 'ptcoach_diary' && activeClient && (
            <PTcoachDiaryView
              clients={clients}
              activeClient={activeClient}
              onSelectClient={setActiveClientId}
              brand={brand}
              onToggleFoodCheck={handleToggleFoodCheck}
              onDeleteFood={handleDeleteFood}
              onAddFoodToMeal={handleAddFoodToMeal}
              onUpdateWaterGlasses={handleUpdateWaterGlasses}
              onTriggerToast={triggerToast}
            />
          )}

          {currentTab === 'grocery_list' && activeClient && (
            <GroceryListView
              clients={clients}
              activeClient={activeClient}
              onSelectClient={setActiveClientId}
              brand={brand}
              onTriggerToast={triggerToast}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardView
              clients={clients}
              routines={routines}
              brand={brand}
              onNavigateToClients={() => setCurrentTab('clients')}
              onNavigateToNutrition={() => setCurrentTab('ptcoach_diary')}
            />
          )}

          {currentTab === 'clients' && (
            <ClientsView
              clients={clients}
              routines={routines}
              brand={brand}
              searchTerm={searchTerm}
              onAddClient={handleAddClient}
              onUpdateClientStatus={handleUpdateClientStatus}
              onUpdatePaymentStatus={handleUpdatePaymentStatus}
              onDeleteClient={handleDeleteClient}
              onTriggerToast={triggerToast}
            />
          )}

          {currentTab === 'workouts' && (
            <WorkoutsView
              routines={routines}
              brand={brand}
              onAddRoutine={handleAddRoutine}
              onTriggerToast={triggerToast}
            />
          )}
        </main>

        {/* Mobile Native Bottom Navigation Bar */}
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            startTransition(() => {
              setCurrentTab(tab);
            });
          }}
          brandPrimaryColor={brand.primaryColor}
        />
      </div>

      {/* White Label Customizer Modal */}
      <WhiteLabelSettingsModal
        isOpen={isWhiteLabelModalOpen}
        onClose={() => setIsWhiteLabelModalOpen(false)}
        brand={brand}
        onSaveBrand={handleSaveBrand}
      />

      {/* Demo Login Modal (when logged out) */}
      <LoginDemoModal
        isOpen={!isLoggedIn}
        onLogin={() => {
          setIsLoggedIn(true);
          triggerToast(`Bienvenido de nuevo, ${brand.coachName}`, 'success');
        }}
        brand={brand}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
