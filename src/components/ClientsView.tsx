import { useState } from 'react';
import {
  UserPlus,
  Filter,
  Flame,
  Dumbbell,
  Activity,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import type { Client, FitnessGoal, ClientStatus, PaymentStatus, WorkoutRoutine, BrandConfig } from '../types';

interface ClientsViewProps {
  clients: Client[];
  routines: WorkoutRoutine[];
  brand: BrandConfig;
  searchTerm: string;
  onAddClient: (newClient: Client) => void;
  onUpdateClientStatus: (clientId: string, status: ClientStatus) => void;
  onUpdatePaymentStatus: (clientId: string, paymentStatus: PaymentStatus) => void;
  onDeleteClient: (clientId: string) => void;
  onTriggerToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  routines,
  brand,
  searchTerm,
  onAddClient,
  onUpdateClientStatus,
  onUpdatePaymentStatus,
  onDeleteClient,
  onTriggerToast,
}) => {
  const [goalFilter, setGoalFilter] = useState<'all' | FitnessGoal>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClientForDetail, setSelectedClientForDetail] = useState<Client | null>(null);

  // New Client Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAge, setFormAge] = useState('28');
  const [formGender, setFormGender] = useState<'M' | 'F' | 'Other'>('M');
  const [formGoal, setFormGoal] = useState<FitnessGoal>('hypertrophy');
  const [formFee, setFormFee] = useState('120');
  const [formRoutineId, setFormRoutineId] = useState(routines[0]?.id || 'rt-1');
  const [formWeight, setFormWeight] = useState('75');
  const [formBodyFat, setFormBodyFat] = useState('18');
  const [formMuscle, setFormMuscle] = useState('35');

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = goalFilter === 'all' || c.goal === goalFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesGoal && matchesStatus;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      onTriggerToast('Por favor diligencia nombre y correo del atleta', 'info');
      return;
    }

    const assignedRoutine = routines.find((r) => r.id === formRoutineId);
    const today = new Date().toISOString().split('T')[0];

    const newClient: Client = {
      id: `cli-${Date.now()}`,
      fullName: formName,
      email: formEmail,
      phone: formPhone || '+57 300 000 0000',
      age: parseInt(formAge, 10) || 25,
      gender: formGender,
      goal: formGoal,
      status: 'active',
      joinedDate: today,
      monthlyFeeUsd: parseFloat(formFee) || 120,
      paymentStatus: 'paid',
      assignedRoutineId: formRoutineId,
      assignedRoutineName: assignedRoutine ? assignedRoutine.title : 'Rutina Personalizada',
      nutrition: {
        dailyCalories: formGoal === 'fat_loss' ? 1800 : formGoal === 'hypertrophy' ? 2800 : 2300,
        proteinGrams: 160,
        carbsGrams: 240,
        fatsGrams: 65,
        waterLiters: 3.5,
      },
      records: [
        {
          date: today,
          weightKg: parseFloat(formWeight) || 70,
          bodyFatPercentage: parseFloat(formBodyFat) || 20,
          muscleMassKg: parseFloat(formMuscle) || 30,
        },
      ],
      dailyLog: {
        date: today,
        waterGlasses: 0,
        targetWaterGlasses: 12,
        meals: [
          { id: `meal-breakfast-${Date.now()}`, type: 'breakfast', name: 'Desayuno', targetKcal: 500, foods: [] },
          { id: `meal-lunch-${Date.now()}`, type: 'lunch', name: 'Almuerzo', targetKcal: 750, foods: [] },
          { id: `meal-snack-${Date.now()}`, type: 'snack', name: 'Merienda', targetKcal: 350, foods: [] },
          { id: `meal-dinner-${Date.now()}`, type: 'dinner', name: 'Cena', targetKcal: 600, foods: [] },
        ],
      },
    };

    onAddClient(newClient);
    onTriggerToast(`Atleta ${newClient.fullName} registrado en el XML`, 'success');
    setIsAddModalOpen(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
  };

  const getGoalBadge = (goal: FitnessGoal) => {
    switch (goal) {
      case 'hypertrophy':
        return <span className="goal-badge goal-hypertrophy">Hipertrofia</span>;
      case 'fat_loss':
        return <span className="goal-badge goal-fatloss">Pérdida de Grasa</span>;
      case 'strength':
        return <span className="goal-badge goal-strength">Fuerza Máxima</span>;
      case 'endurance':
        return <span className="goal-badge goal-endurance">Resistencia</span>;
      case 'rehab':
        return <span className="goal-badge goal-rehab">Readaptación</span>;
    }
  };

  return (
    <div className="clients-container">
      {/* Header and Add button */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Directorio de Atletas &amp; Clientes</h1>
          <p className="section-desc">
            Seguimiento antropométrico, rutinas activas y mensualidades sincronizadas con XML.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-brand"
        >
          <UserPlus size={16} />
          <span>Registrar Nuevo Atleta</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar">
        <div className="filter-group">
          <Filter size={15} className="text-muted" />
          <span className="filter-label">Objetivo:</span>
          {(['all', 'hypertrophy', 'fat_loss', 'strength', 'rehab'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGoalFilter(g)}
              className={`filter-btn ${goalFilter === g ? 'filter-btn-active' : ''}`}
            >
              {g === 'all'
                ? 'Todos'
                : g === 'hypertrophy'
                ? 'Hipertrofia'
                : g === 'fat_loss'
                ? 'Definición'
                : g === 'strength'
                ? 'Fuerza'
                : 'Readaptación'}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="custom-select"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="paused">Pausado</option>
            <option value="injured">Lesión / Baja</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card-panel table-panel">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Atleta</th>
                <th>Objetivo Principal</th>
                <th>Antropometría Reciente</th>
                <th>Rutina Asignada</th>
                <th>Mensualidad</th>
                <th>Estado</th>
                <th className="text-right">Ficha</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-state">
                    No hay atletas que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  const latestRecord = client.records[client.records.length - 1];
                  return (
                    <tr key={client.id}>
                      <td>
                        <div className="athlete-cell">
                          <div
                            className="athlete-avatar"
                            style={{ backgroundColor: brand.primaryColor }}
                          >
                            {client.fullName
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                          <div>
                            <div className="athlete-name">{client.fullName}</div>
                            <div className="athlete-sub">
                              {client.gender === 'M' ? 'Hombre' : 'Mujer'}, {client.age} años • {client.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{getGoalBadge(client.goal)}</td>
                      <td>
                        {latestRecord ? (
                          <div className="text-xs">
                            <span className="font-semibold">{latestRecord.weightKg} kg</span> •{' '}
                            <span className="text-secondary">{latestRecord.bodyFatPercentage}% grasa</span>
                          </div>
                        ) : (
                          <span className="text-muted text-xs">Sin registros</span>
                        )}
                      </td>
                      <td>
                        <span className="routine-assigned-tag">
                          {client.assignedRoutineName}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm">
                            ${client.monthlyFeeUsd} {brand.currency}
                          </span>
                          <span
                            className={`badge-payment status-${client.paymentStatus}`}
                            title={`Pago: ${client.paymentStatus}`}
                          >
                            {client.paymentStatus === 'paid' ? (
                              <CheckCircle2 size={12} />
                            ) : client.paymentStatus === 'pending' ? (
                              <Clock size={12} />
                            ) : (
                              <AlertTriangle size={12} />
                            )}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge-status status-${client.status}`}>
                          {client.status === 'active'
                            ? 'Activo'
                            : client.status === 'paused'
                            ? 'Pausado'
                            : 'Lesión'}
                        </span>
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => setSelectedClientForDetail(client)}
                          className="btn-icon-table"
                          title="Abrir Ficha 360°"
                        >
                          <ChevronRight size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ficha 360° Modal / Detail Drawer */}
      {selectedClientForDetail && (
        <div className="modal-backdrop">
          <div className="modal-card modal-card-lg">
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div
                  className="athlete-avatar"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {selectedClientForDetail.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <h3 className="modal-title">{selectedClientForDetail.fullName}</h3>
                  <p className="modal-desc">
                    {selectedClientForDetail.email} • Inscrito el {selectedClientForDetail.joinedDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClientForDetail(null)}
                className="modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="detail-drawer-content">
              {/* Quick Actions Bar */}
              <div className="detail-actions-bar">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Estado del Atleta:</span>
                  <button
                    onClick={() => {
                      onUpdateClientStatus(selectedClientForDetail.id, 'active');
                      setSelectedClientForDetail({
                        ...selectedClientForDetail,
                        status: 'active',
                      });
                      onTriggerToast('Estado cambiado a Activo', 'success');
                    }}
                    className={`btn-state-toggle ${
                      selectedClientForDetail.status === 'active' ? 'state-active' : ''
                    }`}
                  >
                    Activo
                  </button>
                  <button
                    onClick={() => {
                      onUpdateClientStatus(selectedClientForDetail.id, 'paused');
                      setSelectedClientForDetail({
                        ...selectedClientForDetail,
                        status: 'paused',
                      });
                      onTriggerToast('Estado cambiado a Pausado', 'info');
                    }}
                    className={`btn-state-toggle ${
                      selectedClientForDetail.status === 'paused' ? 'state-paused' : ''
                    }`}
                  >
                    Pausado
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Estado Cobro:</span>
                  <button
                    onClick={() => {
                      onUpdatePaymentStatus(selectedClientForDetail.id, 'paid');
                      setSelectedClientForDetail({
                        ...selectedClientForDetail,
                        paymentStatus: 'paid',
                      });
                      onTriggerToast('Mensualidad marcada como Pagada', 'success');
                    }}
                    className="btn-pay-status text-brand"
                  >
                    Marcar Pagado
                  </button>
                </div>
              </div>

              {/* 3 Pillars: Anthropometry, Nutrition, Workout */}
              <div className="detail-pillars-grid">
                {/* Pillar 1: Antropometría */}
                <div className="pillar-box">
                  <div className="pillar-title">
                    <Activity size={15} style={{ color: brand.primaryColor }} />
                    <span>Progreso Antropométrico (XML)</span>
                  </div>
                  <div className="records-timeline">
                    {selectedClientForDetail.records.map((r, i) => (
                      <div key={i} className="record-item">
                        <div className="record-date">{r.date}</div>
                        <div className="record-stats">
                          <span className="font-semibold">{r.weightKg} kg</span> •{' '}
                          <span className="text-brand">{r.bodyFatPercentage}% grasa</span> •{' '}
                          <span>{r.muscleMassKg} kg músculo</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 2: Nutrición */}
                <div className="pillar-box">
                  <div className="pillar-title">
                    <Flame size={15} className="text-amber-500" />
                    <span>Objetivos de Nutrición Diarios</span>
                  </div>
                  <div className="nutrition-stats-box">
                    <div className="calorie-badge">
                      {selectedClientForDetail.nutrition.dailyCalories} kcal / día
                    </div>
                    <div className="macros-grid">
                      <div className="macro-card">
                        <span className="macro-name">Proteína</span>
                        <span className="macro-val">{selectedClientForDetail.nutrition.proteinGrams}g</span>
                      </div>
                      <div className="macro-card">
                        <span className="macro-name">Carbohidratos</span>
                        <span className="macro-val">{selectedClientForDetail.nutrition.carbsGrams}g</span>
                      </div>
                      <div className="macro-card">
                        <span className="macro-name">Grasas</span>
                        <span className="macro-val">{selectedClientForDetail.nutrition.fatsGrams}g</span>
                      </div>
                    </div>
                    <div className="water-row text-xs text-muted mt-2">
                      Hidratación mínima: {selectedClientForDetail.nutrition.waterLiters} Litros / día
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Workout Routine assigned */}
              <div className="pillar-box mt-3">
                <div className="pillar-title">
                  <Dumbbell size={15} style={{ color: brand.primaryColor }} />
                  <span>Programa de Entrenamiento Prescrito</span>
                </div>
                <div className="text-sm font-semibold mb-2">
                  {selectedClientForDetail.assignedRoutineName}
                </div>
                <p className="text-xs text-muted">
                  Puedes cambiar o modificar los ejercicios de este programa en el módulo de Rutinas.
                </p>
              </div>

              <div className="detail-footer-delete">
                <button
                  onClick={() => {
                    if (confirm(`¿Estás seguro de eliminar el registro de ${selectedClientForDetail.fullName}?`)) {
                      onDeleteClient(selectedClientForDetail.id);
                      setSelectedClientForDetail(null);
                      onTriggerToast('Atleta eliminado de la base XML', 'info');
                    }
                  }}
                  className="btn-danger-outline"
                >
                  Eliminar Atleta del Sistema
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Registrar Nuevo Atleta */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card modal-card-lg">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <UserPlus size={18} style={{ color: brand.primaryColor }} />
                <h3 className="modal-title">Registrar Nuevo Atleta en la Base XML</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="modal-close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="modal-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Nombre y Apellidos</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Daniel Restrepo"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="daniel@email.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Teléfono Móvil</label>
                  <input
                    type="text"
                    placeholder="+57 310 123 4567"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Género</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    className="form-input"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Objetivo de Entrenamiento</label>
                  <select
                    value={formGoal}
                    onChange={(e) => setFormGoal(e.target.value as FitnessGoal)}
                    className="form-input"
                  >
                    <option value="hypertrophy">Hipertrofia Muscular</option>
                    <option value="fat_loss">Pérdida de Grasa &amp; Definición</option>
                    <option value="strength">Fuerza Máxima</option>
                    <option value="endurance">Resistencia Cardiovascular</option>
                    <option value="rehab">Readaptación de Lesiones</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Mensualidad ({brand.currency})</label>
                  <input
                    type="number"
                    value={formFee}
                    onChange={(e) => setFormFee(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Rutina Asignada Inicial</label>
                <select
                  value={formRoutineId}
                  onChange={(e) => setFormRoutineId(e.target.value)}
                  className="form-input"
                >
                  {routines.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} ({r.daysPerWeek} días/sem • {r.focus})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Peso Inicial (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">% Grasa Estimado</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formBodyFat}
                    onChange={(e) => setFormBodyFat(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Masa Muscular (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formMuscle}
                    onChange={(e) => setFormMuscle(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-brand">
                  Guardar en Base XML
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
