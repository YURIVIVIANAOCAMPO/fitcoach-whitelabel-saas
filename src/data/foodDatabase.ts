export interface FoodDatabaseItem {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'vegetable' | 'fruit' | 'dairy';
  defaultGrams: number;
  kcalPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatsPer100g: number;
  servingLabel: string;
}

export const PTCOACH_FOOD_DATABASE: FoodDatabaseItem[] = [
  // Proteins
  {
    id: 'f-1',
    name: 'Pechuga de Pollo a la Plancha',
    category: 'protein',
    defaultGrams: 150,
    kcalPer100g: 165,
    proteinPer100g: 31,
    carbsPer100g: 0,
    fatsPer100g: 3.6,
    servingLabel: '1 filete mediano (150g)',
  },
  {
    id: 'f-2',
    name: 'Huevos Enteros Cocidos / Revueltos',
    category: 'protein',
    defaultGrams: 100,
    kcalPer100g: 143,
    proteinPer100g: 12.6,
    carbsPer100g: 0.7,
    fatsPer100g: 9.5,
    servingLabel: '2 huevos medianos (100g)',
  },
  {
    id: 'f-3',
    name: 'Proteína Whey Isolate',
    category: 'protein',
    defaultGrams: 30,
    kcalPer100g: 370,
    proteinPer100g: 86,
    carbsPer100g: 2.5,
    fatsPer100g: 1.2,
    servingLabel: '1 scoop (30g)',
  },
  {
    id: 'f-4',
    name: 'Lomo de Salmón Fresco al Horno',
    category: 'protein',
    defaultGrams: 150,
    kcalPer100g: 208,
    proteinPer100g: 22,
    carbsPer100g: 0,
    fatsPer100g: 13,
    servingLabel: '1 porción (150g)',
  },
  {
    id: 'f-5',
    name: 'Atún en Agua (Lata)',
    category: 'protein',
    defaultGrams: 120,
    kcalPer100g: 116,
    proteinPer100g: 26,
    carbsPer100g: 0,
    fatsPer100g: 1,
    servingLabel: '1 lata escurrida (120g)',
  },
  {
    id: 'f-6',
    name: 'Carne Magra de Res Molida (90/10)',
    category: 'protein',
    defaultGrams: 150,
    kcalPer100g: 176,
    proteinPer100g: 26,
    carbsPer100g: 0,
    fatsPer100g: 8,
    servingLabel: '1 porción (150g)',
  },

  // Carbs
  {
    id: 'f-7',
    name: 'Avena en Hojuelas Integral',
    category: 'carb',
    defaultGrams: 50,
    kcalPer100g: 389,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatsPer100g: 6.9,
    servingLabel: '1/2 taza (50g)',
  },
  {
    id: 'f-8',
    name: 'Arroz Blanco Cocido',
    category: 'carb',
    defaultGrams: 150,
    kcalPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28.2,
    fatsPer100g: 0.3,
    servingLabel: '1 taza cocida (150g)',
  },
  {
    id: 'f-9',
    name: 'Batata / Camote al Horno',
    category: 'carb',
    defaultGrams: 200,
    kcalPer100g: 86,
    proteinPer100g: 1.6,
    carbsPer100g: 20.1,
    fatsPer100g: 0.1,
    servingLabel: '1 unidad mediana (200g)',
  },
  {
    id: 'f-10',
    name: 'Pasta Integral Cocida',
    category: 'carb',
    defaultGrams: 140,
    kcalPer100g: 124,
    proteinPer100g: 5.3,
    carbsPer100g: 26.5,
    fatsPer100g: 0.5,
    servingLabel: '1 plato mediano (140g)',
  },
  {
    id: 'f-11',
    name: 'Pan Integral de Grano Entero',
    category: 'carb',
    defaultGrams: 60,
    kcalPer100g: 247,
    proteinPer100g: 13,
    carbsPer100g: 41.3,
    fatsPer100g: 3.4,
    servingLabel: '2 rebanadas (60g)',
  },

  // Fats
  {
    id: 'f-12',
    name: 'Aguacate Hass',
    category: 'fat',
    defaultGrams: 70,
    kcalPer100g: 160,
    proteinPer100g: 2,
    carbsPer100g: 8.5,
    fatsPer100g: 14.7,
    servingLabel: '1/2 aguacate mediano (70g)',
  },
  {
    id: 'f-13',
    name: 'Aceite de Oliva Extra Virgen',
    category: 'fat',
    defaultGrams: 15,
    kcalPer100g: 884,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatsPer100g: 100,
    servingLabel: '1 cucharada sopera (15ml)',
  },
  {
    id: 'f-14',
    name: 'Almendras Naturales Tostadas',
    category: 'fat',
    defaultGrams: 30,
    kcalPer100g: 579,
    proteinPer100g: 21.2,
    carbsPer100g: 21.6,
    fatsPer100g: 49.9,
    servingLabel: '1 puñado (30g)',
  },
  {
    id: 'f-15',
    name: 'Mantequilla de Maní Natural (100% cacahuete)',
    category: 'fat',
    defaultGrams: 30,
    kcalPer100g: 588,
    proteinPer100g: 25,
    carbsPer100g: 20,
    fatsPer100g: 50,
    servingLabel: '2 cucharaditas (30g)',
  },

  // Fruits & Veggies
  {
    id: 'f-16',
    name: 'Plátano / Banano Maduro',
    category: 'fruit',
    defaultGrams: 120,
    kcalPer100g: 89,
    proteinPer100g: 1.1,
    carbsPer100g: 22.8,
    fatsPer100g: 0.3,
    servingLabel: '1 unidad mediana (120g)',
  },
  {
    id: 'f-17',
    name: 'Fresas / Frutos Rojos Frescos',
    category: 'fruit',
    defaultGrams: 150,
    kcalPer100g: 32,
    proteinPer100g: 0.7,
    carbsPer100g: 7.7,
    fatsPer100g: 0.3,
    servingLabel: '1 taza (150g)',
  },
  {
    id: 'f-18',
    name: 'Brócoli al Vapor',
    category: 'vegetable',
    defaultGrams: 150,
    kcalPer100g: 35,
    proteinPer100g: 2.4,
    carbsPer100g: 7.2,
    fatsPer100g: 0.4,
    servingLabel: '1 taza colmada (150g)',
  },
  {
    id: 'f-19',
    name: 'Espinacas Frescas Baby',
    category: 'vegetable',
    defaultGrams: 100,
    kcalPer100g: 23,
    proteinPer100g: 2.9,
    carbsPer100g: 3.6,
    fatsPer100g: 0.4,
    servingLabel: '1 bol para ensalada (100g)',
  },

  // Dairy
  {
    id: 'f-20',
    name: 'Yogurt Griego Natural 0% Grasa',
    category: 'dairy',
    defaultGrams: 170,
    kcalPer100g: 59,
    proteinPer100g: 10,
    carbsPer100g: 3.6,
    fatsPer100g: 0.4,
    servingLabel: '1 envase individual (170g)',
  },
];

export function calculateMacrosForGrams(item: FoodDatabaseItem, grams: number) {
  const factor = grams / 100;
  return {
    grams,
    kcal: Math.round(item.kcalPer100g * factor),
    protein: Math.round(item.proteinPer100g * factor * 10) / 10,
    carbs: Math.round(item.carbsPer100g * factor * 10) / 10,
    fats: Math.round(item.fatsPer100g * factor * 10) / 10,
  };
}

export const FITIA_FOOD_DATABASE = PTCOACH_FOOD_DATABASE;

