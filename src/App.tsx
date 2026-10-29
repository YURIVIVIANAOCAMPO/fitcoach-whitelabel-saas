import { useState, useEffect, useTransition } from 'react';
import type { BrandConfig, WorkoutRoutine, Client, ClientStatus, PaymentStatus } from './types';
import {
  loadDatabaseFromStorage,
  saveDatabaseToStorage,
  serializeFitCoachToXml,
  resetDatabaseToInitial,
  parseFitCoachXml,
} from './services/xmlService';
import { Sidebar, type TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ClientsView } from './components/ClientsView';
import { WorkoutsView } from './components/WorkoutsView';
import { XmlManagerView } from './components/XmlManagerView';
import { WhiteLabelSettingsModal } from './components/WhiteLabelSettingsModal';
import { LoginDemoModal } from './components/LoginDemoModal';
import { ToastContainer, type ToastMessage } from './components/Toast';
import './App.css';

export default function App() {
  const [initialData] = useState(() => loadDatabaseFromStorage());

  const [brand, setBrand] = useState<BrandConfig>(initialData.brand);
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(initialData.routines);
  const [clients, setClients] = useState<Client[]>(initialData.clients);
  const [currentXml, setCurrentXml] = useState<string>(initialData.rawXml);

  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isWhiteLabelModalOpen, setIsWhiteLabelModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem('fitcoach_theme') !== 'light';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [, startTransition] = useTransition();

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

  // Client handlers
  const handleAddClient = (newClient: Client) => {
    const updated = [newClient, ...clients];
    setClients(updated);
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
    triggerToast(`Identidad de marca actualizada: ${newBrand.brandName}`, 'success');
  };

  // Import raw XML
  const handleImportNewXml = (xmlString: string) => {
    try {
      const parsed = parseFitCoachXml(xmlString);
      setBrand(parsed.brand);
      setRoutines(parsed.routines);
      setClients(parsed.clients);
      setCurrentXml(xmlString);
      saveDatabaseToStorage(xmlString);
    } catch (e: any) {
      triggerToast(e.message || 'Error al importar XML', 'error');
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    const fresh = resetDatabaseToInitial();
    setBrand(fresh.brand);
    setRoutines(fresh.routines);
    setClients(fresh.clients);
    setCurrentXml(fresh.rawXml);
  };

  const handleReloadXml = () => {
    const reloaded = loadDatabaseFromStorage();
    setBrand(reloaded.brand);
    setRoutines(reloaded.routines);
    setClients(reloaded.clients);
    setCurrentXml(reloaded.rawXml);
    triggerToast('Base de datos XML recargada', 'info');
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
          onReloadXml={handleReloadXml}
          isDarkTheme={isDarkTheme}
          onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        />

        <main className="content-body">
          {currentTab === 'dashboard' && (
            <DashboardView
              clients={clients}
              routines={routines}
              brand={brand}
              onNavigateToClients={() => setCurrentTab('clients')}
              onNavigateToXml={() => setCurrentTab('xml_manager')}
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

          {currentTab === 'xml_manager' && (
            <XmlManagerView
              currentXml={currentXml}
              brand={brand}
              routines={routines}
              clients={clients}
              onImportNewXml={handleImportNewXml}
              onResetToDefault={handleResetToDefault}
              onTriggerToast={triggerToast}
            />
          )}
        </main>
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
