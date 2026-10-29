# 🏋️‍♂️ PTcoach Pro • White-Label Personal Trainer SaaS

<div align="center">

![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
[![CI Pipeline](https://github.com/YURIVIVIANAOCAMPO/fitcoach-whitelabel-saas/actions/workflows/ci.yml/badge.svg)](https://github.com/YURIVIVIANAOCAMPO/fitcoach-whitelabel-saas/actions)
![Storage](https://img.shields.io/badge/Data_Contracts-Native_XML-blue?style=for-the-badge)
![UI](https://img.shields.io/badge/Theme-Pro_Navy_&_Blue-2563eb?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

<p align="center">
  <strong>Plataforma SaaS Marca Blanca minimalista para Entrenadores Personales y Preparadores Físicos.</strong>
  <br />
  Flujo completo de nutrición deportiva y macros, rutinas, directorio de atletas, contratos de API simulados con base de datos XML bajo el capó y personalización en tiempo real.
</p>

[🚀 Ver Demo en Vivo en GitHub Pages](https://yurivivianaocampo.github.io/fitcoach-whitelabel-saas/) • [Características](#-características-del-sistema) • [Arquitectura de API & XML](#-arquitectura-simulada-api--contratos-xml) • [Instalación](#-instalación-rápida)

</div>

---

## 🎯 Vista General

**PTcoach Pro** es una solución **SaaS Marca Blanca (White-Label)** creada específicamente para entrenadores personales, preparadores físicos y centros de rendimiento atlético. Diseñada con una estética moderna en tonos **azules profesionales** (`#2563eb`, `#0ea5e9`, fondo Navy Slate) y la tipografía geométrica y minimalista **Plus Jakarta Sans**.

El sistema opera en modo **Demo Front-end** de alto desempeño: en lugar de requerir una infraestructura pesada de backend y base de datos relacional para la demostración, implementa una **capa de cliente de API (`PTcoachApiClient`)** que interactúa con contratos de datos serializados en **XML** nativo de forma transparente e invisible para el usuario final.

---

## ✨ Características del Sistema

### 🥗 1. Diario de Nutrición & Macros (Flujo Inteligente Estilo Fitia)
- **Anillo Metabólico & Ecuación Calórica:** Gráfica circular SVG interactiva con cálculo de calorías consumidas vs. meta diaria del atleta (`targetKcal - consumed = restantes`).
- **Monitoreo de Macronutrientes en Tiempo Real:** Barras de progreso precisas para Proteínas, Carbohidratos y Grasas en gramos con porcentajes de adherencia.
- **Plan Diario de 4 Comidas:** Desayuno, Almuerzo, Merienda y Cena con checkboxes de cumplimiento de ingesta por alimento.
- **Buscador & Calculador de Porciones en Gramos:** Base de datos con alimentos comunes (pechuga, avena, aguacate, huevos, salmón, arroz, etc.) con cálculo automático e instantáneo de macronutrientes al mover el slider de gramos.
- **Tracker de Hidratación:** Contador de vasos de agua de 250ml con meta personalizada en litros por atleta.

### 🛒 2. Lista de Compras Inteligente para el Súper
- Consolida y suma automáticamente todos los ingredientes prescritos en las 4 comidas diarias.
- Clasifica por categorías de compra: *Carnes & Proteínas, Cereales & Granos, Frutas & Verduras, Lácteos & Grasas*.
- Cálculo estimado semanal (7 días) para compras en el supermercado.
- Botón de **"Compartir por WhatsApp"** que copia la lista formateada con emojis lista para enviar al atleta.

### 🎨 3. Personalización de Marca Blanca (White-Label Studio)
- **Transformación de Marca en Tiempo Real:** Nombre de marca, nombre del coach, título profesional y subdominio personalizado (`coach.tuapp.com`).
- **Paleta de Colores en Azules Profesionales:** Presets en *Royal Blue (PTcoach), Sky Tech, Deep Navy, Electric Cyan, Indigo Sleek, Teal Pro y Emerald Minimal*.
- **Iconos Vectoriales Dinámicos:** Pulso (`activity`), Pesas (`dumbbell`), Fuego (`flame`), Rayo (`zap`), Trofeo (`trophy`) o Corona (`crown`).
- **Modo Oscuro & Modo Claro:** Interfaz con soporte fluido para alternar temas visuales.

### 👥 4. Gestión Integral de Atletas
- Directorio con búsqueda y filtros por objetivo (*Hipertrofia, Pérdida de Grasa, Fuerza Máxima, Readaptación*) y estado (*Activo, Pausado, Lesionado*).
- Fichas antropométricas con peso (kg), % de grasa y masa muscular.
- Monitoreo de mensualidades y estado de cobro (*Al día / Cobros pendientes*).

### 🏋️‍♂️ 5. Programación de Rutinas de Entrenamiento
- Prescripción técnica de programas (*Push-Pull-Legs, Fuerza, Hipertrofia, Funcional*).
- Desglose por ejercicios, series, repeticiones, descansos en segundos y notas biomecánicas.

### 📱 6. Experiencia 100% Responsive & Mobile
- Barra de navegación inferior nativa (`BottomNavBar`) en pantallas móviles (Nutrición, Súper, Resumen, Atletas, Rutinas).
- Menú lateral deslizable y header minimalista con búsqueda rápida.

---

## 🏛️ Arquitectura Simulada: API & Contratos XML

En lugar de requerir microservicios y bases de datos tradicionales para evaluar el demo, **PTcoach** estructura su arquitectura mediante:

```text
[Vistas UI React 19]
       ↓
[PTcoachApiClient (async/await)]
       ↓
[Contratos de Datos en XML (<ptcoach_database>)]
       ↓
[DOMParser & XMLSerializer (Persistencia Local)]
```

- **Transparente para el Usuario:** No hay ventanas técnicas ni editores de código expuestos en la interfaz. El entrenador solo disfruta de una experiencia fluida, rápida y profesional.
- **Tipado Fuerte:** Contratos TypeScript estrictos para cada entidad (`BrandConfig`, `Client`, `DailyLog`, `Meal`, `FoodItem`, `WorkoutRoutine`).

---

## 📂 Estructura del Código

```text
fitcoach-whitelabel-saas/
├── src/
│   ├── components/
│   │   ├── PTcoachDiaryView.tsx        # Diario nutricional, macros y comidas
│   │   ├── GroceryListView.tsx         # Lista de compras para el súper
│   │   ├── DashboardView.tsx           # Resumen general, KPIs e ingresos
│   │   ├── ClientsView.tsx             # Directorio y fichas de atletas
│   │   ├── WorkoutsView.tsx            # Biblioteca de rutinas y ejercicios
│   │   ├── Sidebar.tsx                 # Menú lateral con branding reactivo
│   │   ├── Header.tsx                  # Barra superior, búsqueda y temas
│   │   ├── BottomNavBar.tsx            # Navegación móvil nativa
│   │   ├── WhiteLabelSettingsModal.tsx # Personalizador de marca blanca
│   │   └── LoginDemoModal.tsx          # Login demo de un clic
│   ├── data/
│   │   ├── initialXmlData.ts           # Documento XML inicial estructurado
│   │   └── foodDatabase.ts             # Alimentos y cálculo de macros
│   ├── services/
│   │   ├── apiClient.ts                # API client con contratos simulados
│   │   └── xmlService.ts               # Parser y serializador XML
│   ├── types/
│   │   └── index.ts                    # Interfaces de TypeScript
│   ├── index.css                       # Tokens de diseño y fuentes
│   └── App.tsx                         # Orquestador principal de estado
```

---

## 🚀 Instalación Rápida

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/YURIVIVIANAOCAMPO/fitcoach-whitelabel-saas.git
   cd fitcoach-whitelabel-saas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Desarrollado con enfoque en diseño minimalista, rendimiento y experiencia de usuario.
