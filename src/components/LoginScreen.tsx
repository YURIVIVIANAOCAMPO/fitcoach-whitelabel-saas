import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sun,
  Moon,
  CheckCircle2,
  HelpCircle,
  X,
  UserCheck,
} from 'lucide-react';
import type { BrandConfig } from '../types';

interface LoginScreenProps {
  brand: BrandConfig;
  onLogin: (coachName: string) => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

interface DemoProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  brand,
  onLogin,
  isDarkTheme,
  onToggleTheme,
}) => {
  const demoProfiles: DemoProfile[] = [
    {
      id: 'viviana',
      name: brand.coachName,
      email: brand.supportEmail || 'coach@ptcoach.app',
      role: 'Head Coach & Fundadora',
      avatarInitials: 'VO',
    },
    {
      id: 'andres',
      name: 'Coach Andrés Silva',
      email: 'andres.silva@ptcoach.app',
      role: 'Especialista en Fuerza & Hipertrofia',
      avatarInitials: 'AS',
    },
    {
      id: 'custom',
      name: 'Acceso Personalizado',
      email: '',
      role: 'Entrenador Invitado',
      avatarInitials: 'PT',
    },
  ];

  const [selectedProfileId, setSelectedProfileId] = useState<string>('viviana');
  const [email, setEmail] = useState<string>(brand.supportEmail || 'coach@ptcoach.app');
  const [password, setPassword] = useState<string>('ptcoach2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginStep, setLoginStep] = useState<'idle' | 'authenticating' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState<boolean>(false);

  // Dynamic profile switch handler
  const handleSelectProfile = (profile: DemoProfile) => {
    setSelectedProfileId(profile.id);
    setErrorMessage('');
    if (profile.id === 'custom') {
      setEmail('');
      setPassword('');
    } else {
      setEmail(profile.email);
      setPassword('ptcoach2026');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor ingresa tu correo electrónico corporativo.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Por favor ingresa tu contraseña de acceso.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    setLoginStep('authenticating');

    // Smooth dynamic authentication feedback (simulated API delay)
    setTimeout(() => {
      setLoginStep('success');
      setTimeout(() => {
        const activeProf = demoProfiles.find((p) => p.id === selectedProfileId);
        onLogin(activeProf?.name || brand.coachName);
      }, 500);
    }, 700);
  };

  const activeProfile = demoProfiles.find((p) => p.id === selectedProfileId) || demoProfiles[0];

  return (
    <div className="login-page-wrapper">
      {/* Top Utility Bar */}
      <header className="login-top-bar">
        <div className="login-brand-meta">
          <div className="login-app-icon" style={{ backgroundColor: brand.primaryColor }}>
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <span className="login-brand-title">{brand.brandName}</span>
            <span className="login-subdomain-pill">{brand.subdomain}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="login-theme-toggle"
            title={isDarkTheme ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkTheme ? <Sun size={17} /> : <Moon size={17} />}
            <span className="text-xs">{isDarkTheme ? 'Modo Claro' : 'Modo Oscuro'}</span>
          </button>
        </div>
      </header>

      {/* Main Login Card (Clean, Minimalist, No Glows) */}
      <main className="login-card-container">
        <div className="login-clean-card">
          {/* Card Header */}
          <div className="login-card-header">
            <span className="login-tagline-badge">
              <ShieldCheck size={14} style={{ color: brand.primaryColor }} />
              <span>Portal Profesional de Entrenadores</span>
            </span>
            <h1 className="login-headline">Iniciar Sesión</h1>
            <p className="login-desc">
              Accede a la gestión de atletas, planes de nutrición y contratos de entrenamiento.
            </p>
          </div>

          {/* Dynamic Profile Selector Pills */}
          <div className="login-profiles-section">
            <div className="login-profiles-label">
              <span>Selecciona un perfil de acceso rápido:</span>
            </div>
            <div className="login-profiles-grid">
              {demoProfiles.map((prof) => {
                const isSelected = selectedProfileId === prof.id;
                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => handleSelectProfile(prof)}
                    className={`login-profile-btn ${isSelected ? 'login-profile-active' : ''}`}
                    style={
                      isSelected
                        ? { borderColor: brand.primaryColor }
                        : {}
                    }
                  >
                    <span
                      className="login-profile-avatar"
                      style={{
                        backgroundColor: isSelected ? brand.primaryColor : 'var(--bg-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      }}
                    >
                      {prof.avatarInitials}
                    </span>
                    <div className="login-profile-info">
                      <span className="login-profile-name">{prof.name}</span>
                      <span className="login-profile-role">{prof.role}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Profile Info Banner */}
          {selectedProfileId !== 'custom' && (
            <div className="active-profile-notice">
              <UserCheck size={15} style={{ color: brand.primaryColor }} />
              <span className="text-xs text-secondary">
                Ingresando como: <strong className="text-primary">{activeProfile.name}</strong> • Contraseña demo autocompletada
              </span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {errorMessage && (
              <div className="login-error-banner">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="login-input-group">
              <label className="login-label">Correo Electrónico</label>
              <div className="login-input-wrapper">
                <Mail size={16} className="login-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="coach@tudominio.com"
                  className="login-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-input-group">
              <div className="login-password-header">
                <label className="login-label">Contraseña</label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="btn-forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="login-input-wrapper">
                <Lock size={16} className="login-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="••••••••••••"
                  className="login-input login-input-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-toggle-eye"
                  title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  aria-label="Alternar visibilidad de contraseña"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="login-remember-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span>Mantener mi sesión iniciada en este equipo</span>
              </label>
            </div>

            {/* Submit Button (Solid, Modern, No Glow) */}
            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit-button ${loginStep === 'success' ? 'login-submit-success' : ''}`}
              style={{ backgroundColor: brand.primaryColor }}
            >
              {loginStep === 'idle' && (
                <>
                  <span>Ingresar a la Plataforma</span>
                  <ArrowRight size={17} />
                </>
              )}
              {loginStep === 'authenticating' && (
                <>
                  <div className="login-spinner" />
                  <span>Verificando credenciales...</span>
                </>
              )}
              {loginStep === 'success' && (
                <>
                  <CheckCircle2 size={18} />
                  <span>¡Acceso Autorizado!</span>
                </>
              )}
            </button>
          </form>

          {/* Architecture & Security Footnote */}
          <div className="login-security-footer">
            <div className="security-item">
              <span className="security-dot" />
              <span>Simulación de API &amp; Base de Datos XML</span>
            </div>
            <div className="security-item">
              <span className="security-dot" />
              <span>Modo Marca Blanca 100% Client-Side</span>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal Helper */}
      {isForgotModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container max-w-sm">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <HelpCircle size={18} style={{ color: brand.primaryColor }} />
                <h3 className="modal-title">Recuperación de Acceso</h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="modal-close-btn"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="text-sm text-secondary mb-3 leading-relaxed">
                Este sistema funciona en modo demostración con almacenamiento y contratos en XML simulados en tu navegador.
              </p>
              <div className="bg-subtle p-3 rounded-md border border-subtle text-xs mb-3">
                <div className="font-semibold text-primary mb-1">Credenciales Predeterminadas:</div>
                <div className="text-muted">Usuario: <strong className="text-primary">{brand.supportEmail || 'coach@ptcoach.app'}</strong></div>
                <div className="text-muted">Contraseña: <strong className="text-primary">ptcoach2026</strong></div>
              </div>
              <p className="text-xs text-muted">
                Al hacer clic en cualquiera de los perfiles rápidos del formulario, las credenciales se autocompletan de forma automática.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setPassword('ptcoach2026');
                  setIsForgotModalOpen(false);
                }}
                className="btn-brand w-full"
              >
                <span>Restablecer Contraseña Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
