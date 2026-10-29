import { useState } from 'react';
import {
  Dumbbell,
  Clock,
  Plus,
  X,
} from 'lucide-react';
import type { WorkoutRoutine, BrandConfig } from '../types';

interface WorkoutsViewProps {
  routines: WorkoutRoutine[];
  brand: BrandConfig;
  onAddRoutine: (newRoutine: WorkoutRoutine) => void;
  onTriggerToast: (msg: string, type?: 'success' | 'info') => void;
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({
  routines,
  brand,
  onAddRoutine,
  onTriggerToast,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine>(routines[0]);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDays, setNewDays] = useState('4');
  const [newLevel, setNewLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [newFocus, setNewFocus] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('4');
  const [exerciseReps, setExerciseReps] = useState('10-12');
  const [exerciseRest, setExerciseRest] = useState('60');

  const handleCreateRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onTriggerToast('Indica el nombre de la rutina', 'info');
      return;
    }

    const created: WorkoutRoutine = {
      id: `rt-${Date.now()}`,
      title: newTitle,
      daysPerWeek: parseInt(newDays, 10) || 4,
      level: newLevel,
      focus: newFocus || 'Acondicionamiento General',
      exercises: [
        {
          id: `ex-1`,
          name: exerciseName || 'Ejercicio Principal Compuesto',
          sets: parseInt(exerciseSets, 10) || 4,
          reps: exerciseReps || '10-12',
          restSecs: parseInt(exerciseRest, 10) || 60,
          notes: 'Fase concéntrica explosiva, control excéntrico de 2s',
        },
      ],
    };

    onAddRoutine(created);
    setSelectedRoutine(created);
    setIsModalOpen(false);
    onTriggerToast(`Rutina "${created.title}" guardada en la base XML`, 'success');
    setNewTitle('');
    setNewFocus('');
  };

  return (
    <div className="workouts-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Biblioteca de Rutinas &amp; Ejercicios</h1>
          <p className="section-desc">
            Programas prescritos a tus clientes, estructurados en formato XML nativo.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-brand"
        >
          <Plus size={16} />
          <span>Crear Nueva Rutina</span>
        </button>
      </div>

      <div className="workouts-split-layout">
        {/* Routines Sidebar */}
        <div className="routines-sidebar-card">
          <div className="routines-list-title">Programas Disponibles ({routines.length})</div>
          <div className="routines-nav-list">
            {routines.map((r) => {
              const isSelected = selectedRoutine?.id === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoutine(r)}
                  className={`routine-nav-item ${isSelected ? 'routine-nav-item-active' : ''}`}
                  style={
                    isSelected
                      ? {
                          borderColor: brand.primaryColor,
                          backgroundColor: `${brand.primaryColor}12`,
                        }
                      : {}
                  }
                >
                  <div className="font-semibold text-sm">{r.title}</div>
                  <div className="routine-nav-meta">
                    <span>{r.daysPerWeek} días/sem</span> •{' '}
                    <span className="capitalize">{r.level}</span>
                  </div>
                  <div className="routine-nav-focus text-muted text-xs mt-1">
                    Enfoque: {r.focus}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Routine Detail */}
        {selectedRoutine && (
          <div className="routine-detail-panel">
            <div className="routine-detail-header">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="badge-tag"
                    style={{ backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }}
                  >
                    Nivel: {selectedRoutine.level}
                  </span>
                  <span className="text-xs text-muted">ID XML: #{selectedRoutine.id}</span>
                </div>
                <h2 className="routine-detail-title">{selectedRoutine.title}</h2>
                <p className="text-secondary text-sm">
                  Frecuencia semanal recomendada: <strong>{selectedRoutine.daysPerWeek} sesiones</strong> •{' '}
                  Objetivo: <strong>{selectedRoutine.focus}</strong>
                </p>
              </div>
            </div>

            {/* Exercise Table */}
            <div className="exercises-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ejercicio</th>
                    <th>Series</th>
                    <th>Repeticiones</th>
                    <th>Descanso</th>
                    <th>Notas Técnicas del Coach</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRoutine.exercises.map((ex, idx) => (
                    <tr key={ex.id}>
                      <td className="text-muted font-mono">{idx + 1}</td>
                      <td>
                        <div className="font-semibold text-primary">{ex.name}</div>
                      </td>
                      <td>
                        <span className="font-mono">{ex.sets}</span>
                      </td>
                      <td>
                        <span className="font-mono text-brand font-semibold">{ex.reps}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1 text-secondary text-xs">
                          <Clock size={12} />
                          <span>{ex.restSecs}s</span>
                        </div>
                      </td>
                      <td className="text-secondary text-xs">
                        {ex.notes || 'Técnica estricta'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Crear Rutina */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Dumbbell size={18} style={{ color: brand.primaryColor }} />
                <h3 className="modal-title">Diseñar Nueva Rutina en XML</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRoutine} className="modal-form">
              <div className="form-group">
                <label className="form-label">Nombre del Programa</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Glúteos & Isquios Foco Hipertrofia"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Días por Semana</label>
                  <select
                    value={newDays}
                    onChange={(e) => setNewDays(e.target.value)}
                    className="form-input"
                  >
                    <option value="3">3 días (Full Body)</option>
                    <option value="4">4 días (Torso / Pierna)</option>
                    <option value="5">5 días (Push / Pull / Legs)</option>
                    <option value="6">6 días (Avanzado)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nivel Recomendado</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="form-input"
                  >
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Enfoque Principal</label>
                <input
                  type="text"
                  placeholder="Ej: Aumento de masa muscular y fuerza en tren inferior"
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="card-sub-box">
                <div className="font-semibold text-xs mb-2">Primer Ejercicio Base</div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    placeholder="Nombre del Ejercicio (Ej: Hip Thrust con Barra)"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-row-3">
                  <input
                    type="number"
                    placeholder="Series"
                    value={exerciseSets}
                    onChange={(e) => setExerciseSets(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Reps"
                    value={exerciseReps}
                    onChange={(e) => setExerciseReps(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Descanso (s)"
                    value={exerciseRest}
                    onChange={(e) => setExerciseRest(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-brand">
                  Guardar Programa en XML
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
