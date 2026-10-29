import React, { useState } from 'react';
import {
  FileCode2,
  Download,
  Upload,
  Copy,
  RotateCcw,
  CheckCircle2,
  FileCheck,
  Database,
  Code2,
} from 'lucide-react';
import {
  downloadXmlFile,
  readXmlFile,
  parseFitCoachXml,
} from '../services/xmlService';
import type { BrandConfig, WorkoutRoutine, Client } from '../types';

interface XmlManagerViewProps {
  currentXml: string;
  brand: BrandConfig;
  routines: WorkoutRoutine[];
  clients: Client[];
  onImportNewXml: (xmlString: string) => void;
  onResetToDefault: () => void;
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const XmlManagerView: React.FC<XmlManagerViewProps> = ({
  currentXml,
  brand,
  routines,
  clients,
  onImportNewXml,
  onResetToDefault,
  onTriggerToast,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const totalRecordsCount = clients.reduce((sum, c) => sum + c.records.length, 0);
  const totalExercisesCount = routines.reduce((sum, r) => sum + r.exercises.length, 0);
  const xmlSizeBytes = new Blob([currentXml]).size;
  const xmlSizeKb = (xmlSizeBytes / 1024).toFixed(2);

  const handleDownload = () => {
    downloadXmlFile(currentXml, `${brand.brandName.toLowerCase().replace(/\s+/g, '_')}_data.xml`);
    onTriggerToast('Archivo XML descargado exitosamente a tu equipo', 'success');
  };

  const handleCopyClipboard = () => {
    navigator.clipboard?.writeText(currentXml);
    setIsCopied(true);
    onTriggerToast('Código XML copiado al portapapeles', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await readXmlFile(file);
      // Validate
      parseFitCoachXml(content);
      onImportNewXml(content);
      onTriggerToast(`Base de datos XML importada con éxito (${file.name})`, 'success');
      e.target.value = '';
    } catch (err: any) {
      onTriggerToast(err.message || 'Error al procesar el archivo XML', 'error');
    }
  };

  return (
    <div className="xml-manager-container">
      {/* Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Centro de Gestión de Datos XML</h1>
          <p className="section-desc">
            Todos los datos de clientes, antropometría, rutinas y marca blanca se gestionan mediante este archivo XML en el cliente.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="btn-secondary cursor-pointer">
            <Upload size={15} />
            <span>Cargar Archivo XML</span>
            <input
              type="file"
              accept=".xml,text/xml"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
          </label>

          <button onClick={handleDownload} className="btn-brand">
            <Download size={15} />
            <span>Descargar Backup XML</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Tamaño de la Base XML</span>
            <div
              className="kpi-icon-box"
              style={{ backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }}
            >
              <Database size={17} />
            </div>
          </div>
          <div className="kpi-value">{xmlSizeKb} KB</div>
          <div className="kpi-footer">
            <span className="text-secondary text-xs">{xmlSizeBytes} bytes en memoria</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Nodos de Atletas &lt;client&gt;</span>
            <div
              className="kpi-icon-box"
              style={{ backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }}
            >
              <FileCheck size={17} />
            </div>
          </div>
          <div className="kpi-value">{clients.length}</div>
          <div className="kpi-footer">
            <span className="text-secondary text-xs">{totalRecordsCount} evaluaciones antropométricas</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Nodos de Rutinas &lt;routine&gt;</span>
            <div
              className="kpi-icon-box"
              style={{ backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }}
            >
              <FileCode2 size={17} />
            </div>
          </div>
          <div className="kpi-value">{routines.length}</div>
          <div className="kpi-footer">
            <span className="text-secondary text-xs">{totalExercisesCount} ejercicios prescritos</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Motor de Parseo</span>
            <div
              className="kpi-icon-box"
              style={{ backgroundColor: `${brand.primaryColor}20`, color: brand.primaryColor }}
            >
              <Code2 size={17} />
            </div>
          </div>
          <div className="kpi-value">DOMParser</div>
          <div className="kpi-footer">
            <span className="text-brand text-xs font-semibold">100% Client-Side Nativo</span>
          </div>
        </div>
      </div>

      {/* Raw XML Viewer Panel */}
      <div className="card-panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <FileCode2 size={18} style={{ color: brand.primaryColor }} />
            <div>
              <h2 className="panel-title">Estructura XML en Tiempo Real</h2>
              <p className="panel-desc">Visualiza y audita las etiquetas XML activas en el navegador</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyClipboard}
              className="btn-secondary text-xs"
            >
              {isCopied ? <CheckCircle2 size={14} className="text-brand" /> : <Copy size={14} />}
              <span>{isCopied ? '¡Copiado!' : 'Copiar XML'}</span>
            </button>

            <button
              onClick={() => {
                if (confirm('¿Deseas restaurar la base de datos XML original de demostración?')) {
                  onResetToDefault();
                  onTriggerToast('Base de datos restaurada al XML inicial demo', 'info');
                }
              }}
              className="btn-secondary text-xs text-danger"
              title="Restaurar al estado inicial"
            >
              <RotateCcw size={14} />
              <span>Restaurar Demo</span>
            </button>
          </div>
        </div>

        <div className="xml-code-viewer">
          <pre>
            <code>{currentXml}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
