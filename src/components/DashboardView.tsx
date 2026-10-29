import React from 'react';
import {
  Users,
  DollarSign,
  AlertCircle,
  Dumbbell,
  TrendingUp,
  Award,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  UtensilsCrossed,
} from 'lucide-react';
import type { Client, WorkoutRoutine, BrandConfig } from '../types';

interface DashboardViewProps {
  clients: Client[];
  routines: WorkoutRoutine[];
  brand: BrandConfig;
  onNavigateToClients: () => void;
  onNavigateToNutrition: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  clients,
  routines,
  brand,
  onNavigateToClients,
  onNavigateToNutrition,
}) => {
  const activeClients = clients.filter((c) => c.status === 'active');
  const pendingPayments = clients.filter((c) => c.paymentStatus !== 'paid');
  const totalMonthlyIncome = activeClients.reduce((sum, c) => sum + c.monthlyFeeUsd, 0);

  const kpis = [
    {
      title: 'Atletas en Entrenamiento',
      value: activeClients.length.toString(),
      subtext: `${clients.length} registrados en total`,
      icon: Users,
      trend: '+2 este mes',
    },
    {
      title: 'Ingresos Mensuales Recurrentes',
      value: `$${totalMonthlyIncome.toLocaleString()} ${brand.currency}`,
      subtext: 'Calculado por mensualidades',
      icon: DollarSign,
      trend: '+15.4% vs mes anterior',
    },
    {
      title: 'Cobros Pendientes / Vencidos',
      value: pendingPayments.length.toString(),
      subtext: pendingPayments.length > 0 ? 'Requieren recordatorio' : 'Todos al día',
      icon: AlertCircle,
      trend: pendingPayments.length > 0 ? 'Revisar cuentas' : 'Excelente',
      isWarning: pendingPayments.length > 0,
    },
    {
      title: 'Rutinas Prescritas',
      value: routines.length.toString(),
      subtext: 'Programas de fuerza activos',
      icon: Dumbbell,
      trend: 'Programas optimizados',
    },
  ];

  const weeklySchedule = [
    { time: '07:00 AM', athlete: 'Mateo Henao', session: 'Push Fuerza (Pecho/Tríceps)', status: 'Completado' },
    { time: '09:30 AM', athlete: 'Camila Valencia', session: 'Metabólico Funcional & HIIT', status: 'En curso' },
    { time: '04:00 PM', athlete: 'Carlos Eduardo Duque', session: 'Sentadilla & Cadena Posterior', status: 'Programado' },
    { time: '06:30 PM', athlete: 'Santiago Morales', session: 'Pull Hipertrofia (Espalda/Bíceps)', status: 'Programado' },
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Banner with White-label Brand accent */}
      <div
        className="welcome-banner"
        style={{
          borderLeftColor: brand.primaryColor,
          background: `linear-gradient(135deg, ${brand.primaryColor}12 0%, var(--bg-card) 60%)`,
        }}
      >
        <div className="welcome-text-box">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="badge-tag"
              style={{
                backgroundColor: `${brand.primaryColor}25`,
                color: brand.primaryColor,
              }}
            >
              {brand.brandName}
            </span>
            <span className="text-xs text-muted">Sesión iniciada como {brand.coachName}</span>
          </div>
          <h1 className="welcome-title">Panel de Control de Entrenamiento</h1>
          <p className="welcome-desc">
            Gestiona el progreso antropométrico, adherencia a rutinas y finanzas de tus atletas desde un único entorno.
          </p>
        </div>

        <div className="welcome-actions">
          <button onClick={onNavigateToClients} className="btn-brand">
            <Users size={16} />
            <span>Ver Directorio de Atletas</span>
          </button>
          <button onClick={onNavigateToNutrition} className="btn-secondary">
            <UtensilsCrossed size={16} />
            <span>Plan Nutricional & Macros</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">{kpi.title}</span>
                <div
                  className="kpi-icon-box"
                  style={{
                    backgroundColor: kpi.isWarning ? 'rgba(239, 68, 68, 0.15)' : `${brand.primaryColor}20`,
                    color: kpi.isWarning ? '#ef4444' : brand.primaryColor,
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div className="kpi-value">{kpi.value}</div>

              <div className="kpi-footer">
                <span
                  className="kpi-trend"
                  style={{ color: kpi.isWarning ? '#ef4444' : brand.primaryColor }}
                >
                  <ArrowUpRight size={13} />
                  <span>{kpi.trend}</span>
                </span>
                <span className="kpi-subtext">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule & Progress Split */}
      <div className="dashboard-split-grid">
        {/* Today's Training Schedule */}
        <div className="card-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Sesiones de Entrenamiento Hoy</h2>
              <p className="panel-desc">Agenda de entrenamiento personalizado del día</p>
            </div>
            <span
              className="badge-tag"
              style={{ backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }}
            >
              4 Atletas
            </span>
          </div>

          <div className="schedule-list">
            {weeklySchedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-content">
                  <div className="schedule-athlete">{item.athlete}</div>
                  <div className="schedule-session">{item.session}</div>
                </div>
                <span
                  className={`badge-status ${
                    item.status === 'Completado'
                      ? 'status-paid'
                      : item.status === 'En curso'
                      ? 'status-progress'
                      : 'status-scheduled'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Progress Highlights */}
        <div className="card-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Avances Antropométricos</h2>
              <p className="panel-desc">Registros destacados del último mes</p>
            </div>
            <Award size={18} style={{ color: brand.primaryColor }} />
          </div>

          <div className="progress-highlights-list">
            <div className="progress-highlight-item">
              <div className="progress-avatar">CV</div>
              <div className="progress-info">
                <div className="font-semibold text-sm">Camila Valencia</div>
                <div className="text-xs text-muted">Objetivo: Pérdida de Grasa</div>
                <div className="progress-metric-pill text-brand">
                  <Flame size={13} />
                  <span>-5.4% de Grasa Corporal (29.5% → 24.1%)</span>
                </div>
              </div>
            </div>

            <div className="progress-highlight-item">
              <div className="progress-avatar">MH</div>
              <div className="progress-info">
                <div className="font-semibold text-sm">Mateo Henao</div>
                <div className="text-xs text-muted">Objetivo: Hipertrofia</div>
                <div className="progress-metric-pill text-brand">
                  <TrendingUp size={13} />
                  <span>+1.4 kg Masa Muscular (35.0kg → 36.4kg)</span>
                </div>
              </div>
            </div>

            <div className="progress-highlight-item">
              <div className="progress-avatar">CD</div>
              <div className="progress-info">
                <div className="font-semibold text-sm">Carlos Eduardo Duque</div>
                <div className="text-xs text-muted">Objetivo: Fuerza Máxima</div>
                <div className="progress-metric-pill text-brand">
                  <CheckCircle2 size={13} />
                  <span>PR Superado: Sentadilla 140 kg x 5 reps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
