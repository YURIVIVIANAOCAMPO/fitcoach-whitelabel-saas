import React from 'react';
import { ShieldCheck, Dumbbell, ArrowRight } from 'lucide-react';
import type { BrandConfig } from '../types';

interface LoginDemoModalProps {
  isOpen: boolean;
  onLogin: () => void;
  brand: BrandConfig;
}

export const LoginDemoModal: React.FC<LoginDemoModalProps> = ({
  isOpen,
  onLogin,
  brand,
}) => {
  if (!isOpen) return null;

  return (
    <div className="login-backdrop">
      <div className="login-card">
        <div className="login-brand-icon" style={{ backgroundColor: brand.primaryColor }}>
          <Dumbbell size={28} />
        </div>

        <h2 className="login-title">{brand.brandName}</h2>
        <p className="login-subtitle">
          Sistema SaaS Marca Blanca para Entrenadores Personales
        </p>

        <div className="login-demo-badge">
          <ShieldCheck size={16} className="text-brand" />
          <span>Acceso Demostración Activo • API Simulada con XML</span>
        </div>

        <div className="demo-credentials-box">
          <div className="demo-field">
            <span className="demo-label">Usuario Demo:</span>
            <span className="demo-value">{brand.coachName}</span>
          </div>
          <div className="demo-field">
            <span className="demo-label">Rol:</span>
            <span className="demo-value">Head Coach &amp; Administrador</span>
          </div>
          <div className="demo-field">
            <span className="demo-label">Arquitectura:</span>
            <span className="demo-value">Simulador API + Contratos en XML</span>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="btn-login-submit"
          style={{ backgroundColor: brand.primaryColor }}
        >
          <span>Ingresar al Sistema como Entrenador</span>
          <ArrowRight size={18} />
        </button>

        <p className="login-footnote">
          Los datos y contratos se procesan internamente vía XML simulando el backend y base de datos.
        </p>
      </div>
    </div>
  );
};
