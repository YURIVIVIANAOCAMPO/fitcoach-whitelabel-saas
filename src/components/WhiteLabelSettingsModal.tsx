import React, { useState } from 'react';
import {
  Sparkles,
  Dumbbell,
  Flame,
  Zap,
  Trophy,
  Crown,
  Activity,
  X,
  Palette,
  Check,
} from 'lucide-react';
import type { BrandConfig } from '../types';

interface WhiteLabelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandConfig;
  onSaveBrand: (newBrand: BrandConfig) => void;
}

const PRESET_COLORS = [
  { name: 'Volt Lime', hex: '#84cc16' },
  { name: 'Electric Cyan', hex: '#06b6d4' },
  { name: 'Sunset Orange', hex: '#f97316' },
  { name: 'Crimson Rose', hex: '#f43f5e' },
  { name: 'Royal Violet', hex: '#8b5cf6' },
  { name: 'Golden Amber', hex: '#f59e0b' },
  { name: 'Emerald Pro', hex: '#10b981' },
];

export const WhiteLabelSettingsModal: React.FC<WhiteLabelSettingsModalProps> = ({
  isOpen,
  onClose,
  brand,
  onSaveBrand,
}) => {
  const [brandName, setBrandName] = useState(brand.brandName);
  const [coachName, setCoachName] = useState(brand.coachName);
  const [coachTitle, setCoachTitle] = useState(brand.coachTitle);
  const [subdomain, setSubdomain] = useState(brand.subdomain);
  const [primaryColor, setPrimaryColor] = useState(brand.primaryColor);
  const [logoIcon, setLogoIcon] = useState(brand.logoIcon);
  const [currency, setCurrency] = useState(brand.currency);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBrand({
      ...brand,
      brandName,
      coachName,
      coachTitle,
      subdomain,
      primaryColor,
      logoIcon,
      currency,
    });
    onClose();
  };

  const iconsList = [
    { id: 'dumbbell' as const, label: 'Pesas', Icon: Dumbbell },
    { id: 'flame' as const, label: 'Fuego', Icon: Flame },
    { id: 'zap' as const, label: 'Rayo', Icon: Zap },
    { id: 'trophy' as const, label: 'Trofeo', Icon: Trophy },
    { id: 'crown' as const, label: 'Corona', Icon: Crown },
    { id: 'activity' as const, label: 'Pulso', Icon: Activity },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-card modal-card-lg">
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-badge-sparkle">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="modal-title">Personalización de Marca Blanca</h3>
              <p className="modal-desc">
                Adapta el SaaS a la identidad visual de tu estudio o marca de entrenamiento personal.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close" title="Cerrar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Live Preview Bar */}
          <div className="preview-brand-banner" style={{ borderColor: primaryColor }}>
            <div className="preview-brand-avatar" style={{ backgroundColor: primaryColor }}>
              {logoIcon === 'dumbbell' && <Dumbbell size={20} />}
              {logoIcon === 'flame' && <Flame size={20} />}
              {logoIcon === 'zap' && <Zap size={20} />}
              {logoIcon === 'trophy' && <Trophy size={20} />}
              {logoIcon === 'crown' && <Crown size={20} />}
              {logoIcon === 'activity' && <Activity size={20} />}
            </div>
            <div className="preview-brand-info">
              <div className="preview-brand-name">{brandName || 'Tu Marca'}</div>
              <div className="preview-brand-coach">{coachName} • {subdomain}</div>
            </div>
            <span className="preview-brand-tag" style={{ color: primaryColor, backgroundColor: `${primaryColor}22` }}>
              Vista Previa en Vivo
            </span>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Nombre del Estudio / Marca</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Ej: Apex Coach Lab"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subdominio Marca Blanca</label>
              <input
                type="text"
                required
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="coach.apexfit.io"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Nombre del Entrenador</label>
              <input
                type="text"
                required
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                placeholder="Coach Viviana Ocampo"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Especialidad / Título Profesional</label>
              <input
                type="text"
                required
                value={coachTitle}
                onChange={(e) => setCoachTitle(e.target.value)}
                placeholder="Especialista en Hipertrofia & Rendimiento"
                className="form-input"
              />
            </div>
          </div>

          {/* Color Chooser */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Palette size={15} />
              <span>Color Primario de la Marca (Tokens CSS)</span>
            </label>
            <div className="color-presets-row">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setPrimaryColor(c.hex)}
                  className={`color-preset-pill ${primaryColor === c.hex ? 'color-preset-active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {primaryColor === c.hex && <Check size={14} className="text-white" />}
                </button>
              ))}

              <div className="custom-color-input-wrap">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="native-color-picker"
                />
                <span className="custom-color-hex">{primaryColor}</span>
              </div>
            </div>
          </div>

          {/* Logo Icon Picker */}
          <div className="form-group">
            <label className="form-label">Icono Representativo del Logo</label>
            <div className="icon-selector-grid">
              {iconsList.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLogoIcon(id)}
                  className={`icon-select-btn ${logoIcon === id ? 'icon-select-active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Moneda de Cobro a Clientes</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-input"
            >
              <option value="USD">USD ($ - Dólar Americano)</option>
              <option value="EUR">EUR (€ - Euro)</option>
              <option value="COP">COP ($ - Peso Colombiano)</option>
              <option value="MXN">MXN ($ - Peso Mexicano)</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-brand">
              <Sparkles size={16} />
              <span>Guardar &amp; Actualizar Marca</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
