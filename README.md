# 🏋️‍♂️ FitCoach Pro • White-Label Personal Trainer SaaS

<div align="center">

![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
[![CI Pipeline](https://github.com/YURIVIVIANAOCAMPO/fitcoach-whitelabel-saas/actions/workflows/ci.yml/badge.svg)](https://github.com/YURIVIVIANAOCAMPO/fitcoach-whitelabel-saas/actions)
![Storage](https://img.shields.io/badge/Data_Engine-Native_XML-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

<p align="center">
  <strong>Plataforma SaaS Marca Blanca diseñada para Entrenadores Personales y Estudios Fitness.</strong>
  <br />
  Gestión 100% Client-Side con motor de datos en XML nativo, personalización de marca en tiempo real y usuario demo precargado.
</p>

[Ver Demo en Vivo](#) • [Características](#-características-del-sistema) • [Motor XML](#-motor-de-datos-xml-client-side) • [Instalación](#-instalación-rápida)

</div>

---

## 🎯 Vista General

**FitCoach Pro** es una solución **SaaS Marca Blanca (White-Label)** concebida para entrenadores personales, preparadores físicos y centros de acondicionamiento. Permite a cualquier coach transformar toda la identidad del sistema con su propio nombre, subdominio, logotipo y paleta de colores corporativos sin tocar código.

El sistema funciona en modo **Demo Solo Front-end**, utilizando un motor nativo en **XML (`DOMParser` / `XMLSerializer`)** para almacenar, leer, exportar e importar la base de datos de atletas, rutinas y progreso antropométrico directamente en el navegador.

---

## ✨ Características del Sistema

### 🎨 1. Personalización de Marca Blanca (White-Label Studio)
- **Transformación de Marca en Tiempo Real:** Personaliza el nombre comercial del estudio, nombre del entrenador, título profesional y subdominio (`coach.tuestudio.fit`).
- **Paleta de Colores Dinámica por Tokens CSS:** Elige entre presets deportivos (*Volt Lime, Electric Cyan, Sunset Orange, Crimson Rose, Royal Violet, Golden Amber*) o selecciona cualquier color Hex con aplicación instantánea en toda la interfaz.
- **Logotipos Vectoriales Intercambiables:** Soporte para iconos de *Pesas (Dumbbell), Fuego (Flame), Rayo (Zap), Trofeo (Trophy), Corona (Crown)* o *Pulso (Activity)*.

### 👥 2. Gestión 360° de Atletas & Clientes
- **Directorio de Atletas:** Búsqueda rápida y filtros por objetivos (*Hipertrofia, Pérdida de Grasa, Fuerza Máxima, Resistencia, Readaptación de Lesiones*) y por estado (*Activo, Pausado, Lesionado*).
- **Ficha Antropométrica Detallada:** Historial de evaluaciones con evolución de peso corporal (kg), porcentaje de grasa estimada y masa muscular.
- **Nutrición & Macronutrientes:** Metas calóricas diarias personalizadas (kcal) y desglose de Proteínas, Carbohidratos, Grasas e ingesta mínima de agua.
- **Control Financiero:** Seguimiento de mensualidades, cuotas pactadas y estado de cobro (*Pagado, Pendiente, En Mora*).

### 🏋️‍♂️ 3. Biblioteca de Rutinas & Ejercicios
- Prescripción estructurada de programas de entrenamiento (*Push-Pull-Legs, Metabólico Funcional, Fuerza Básica*).
- Desglose por ejercicios, series, rangos de repeticiones, tiempos de descanso en segundos y notas técnicas del coach.
- Modal reactivo para crear nuevos programas de entrenamiento que se sincronizan inmediatamente como nodos `<routine>` en el XML.

### 📄 4. Motor de Datos XML Client-Side (Sin Backend Requerido)
- **Persistencia en XML:** Los datos maestros residen en un archivo XML estructurado con etiquetas estándar (`<fitcoach_database>`, `<brand>`, `<routines>`, `<clients>`).
- **Visor XML en Vivo:** Inspecciona el código XML generado en tiempo real con resaltado visual.
- **Exportación & Respaldo:** Descarga con un clic el archivo `fitcoach_database.xml` a tu computadora.
- **Importación de Datos:** Sube cualquier archivo `.xml` externo para restaurar atletas o cargar bases de clientes.

### 👤 5. Usuario Demo Precargado
- Pantalla de bienvenida con un clic para acceder como **Coach Demo** sin registrar contraseñas.
- Capacidad de alternar sesión o restablecer la base de datos al estado demo original en cualquier momento.

---

## 📂 Arquitectura del Proyecto

```text
fitcoach-whitelabel-saas/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Pipeline CI (Typecheck & Build)
├── src/
│   ├── components/                    # Módulos y vistas de la plataforma
│   │   ├── ClientsView.tsx            # Directorio y Ficha 360° de atletas
│   │   ├── DashboardView.tsx          # Panel principal con KPIs y agenda del día
│   │   ├── Header.tsx                 # Barra superior, búsqueda y estado XML
│   │   ├── LoginDemoModal.tsx         # Acceso 1-click para entrenador demo
│   │   ├── Sidebar.tsx                # Menú con branding dinámico de marca blanca
│   │   ├── Toast.tsx                  # Notificaciones flotantes del sistema
│   │   ├── WhiteLabelSettingsModal.tsx# Personalizador de marca, colores y logo
│   │   ├── WorkoutsView.tsx           # Programas y biblioteca de ejercicios
│   │   └── XmlManagerView.tsx         # Visor, descarga e importador de archivos XML
│   ├── data/
│   │   └── initialXmlData.ts          # XML maestro inicial con atletas y rutinas
│   ├── services/
│   │   └── xmlService.ts              # Parser nativo (DOMParser) y serializador XML
│   ├── types/
│   │   └── index.ts                   # Modelado de datos estricto en TypeScript
│   ├── App.css                        # Tokens de diseño fitness, glassmorphism y dark mode
│   ├── App.tsx                        # Sincronizador de estado reactivo y XML
│   ├── index.css                      # Variables CSS y reset tipográfico
│   └── main.tsx                       # Punto de entrada de la aplicación
├── .env.example                       # Variables de entorno
├── index.html                         # Metadatos SEO y tipografías Google Fonts
├── package.json                       # Dependencias y scripts
└── tsconfig.json                      # Configuración estricta de TypeScript
```

---

## ⚡ Instalación Rápida

Para ejecutar la aplicación localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/YURIVIVIANAOCAMPO/fitcoach-whitelabel-saas.git

# 2. Ingresar a la carpeta
cd fitcoach-whitelabel-saas

# 3. Instalar dependencias
npm install --legacy-peer-deps

# 4. Iniciar el servidor local
npm run dev
```

Abre tu navegador en `http://localhost:5173`.

### 📦 Compilación para Producción

```bash
npm run build
```

---

## 👩‍💻 Autora

Desarrollado por **Viviana Ocampo**  
- GitHub: [@YURIVIVIANAOCAMPO](https://github.com/YURIVIVIANAOCAMPO)  
- Contacto: [darataz0402@gmail.com](mailto:darataz0402@gmail.com)

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT** - consulta el archivo [LICENSE](LICENSE) para más detalles.
