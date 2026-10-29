import type {
  BrandConfig,
  WorkoutRoutine,
  WorkoutExercise,
  Client,
  FitnessGoal,
  ClientStatus,
  PaymentStatus,
  AnthropometricRecord,
  DailyNutritionLog,
  MealLog,
  FoodItem,
  MealType,
} from '../types';
import { INITIAL_FITCOACH_XML } from '../data/initialXmlData';

const STORAGE_KEY = 'fitcoach_xml_database_v2';

export interface ParsedDatabase {
  brand: BrandConfig;
  routines: WorkoutRoutine[];
  clients: Client[];
  rawXml: string;
}

/**
 * Parses XML string into strongly typed TypeScript structures
 */
export function parseFitCoachXml(xmlString: string): ParsedDatabase {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  const parserError = xmlDoc.getElementsByTagName('parsererror');
  if (parserError.length > 0) {
    throw new Error('Error al parsear el archivo XML: Formato inválido o etiquetas no cerradas.');
  }

  // 1. Parse Brand Config
  const brandEl = xmlDoc.getElementsByTagName('brand')[0];
  const brand: BrandConfig = {
    brandName: brandEl?.getElementsByTagName('brand_name')[0]?.textContent || 'PTcoach Pro',
    coachName: brandEl?.getElementsByTagName('coach_name')[0]?.textContent || 'Coach Viviana Ocampo',
    coachTitle: brandEl?.getElementsByTagName('coach_title')[0]?.textContent || 'Especialista en Nutrición & Hipertrofia',
    subdomain: brandEl?.getElementsByTagName('subdomain')[0]?.textContent || 'viviana.ptcoach.app',
    primaryColor: brandEl?.getElementsByTagName('primary_color')[0]?.textContent || '#2563eb',
    accentColor: brandEl?.getElementsByTagName('accent_color')[0]?.textContent || '#0ea5e9',
    logoIcon: (brandEl?.getElementsByTagName('logo_icon')[0]?.textContent as any) || 'activity',
    supportEmail: brandEl?.getElementsByTagName('support_email')[0]?.textContent || 'coach@ptcoach.app',
    currency: brandEl?.getElementsByTagName('currency')[0]?.textContent || 'USD',
  };

  // 2. Parse Routines
  const routinesList: WorkoutRoutine[] = [];
  const routineNodes = xmlDoc.getElementsByTagName('routine');

  for (let i = 0; i < routineNodes.length; i++) {
    const rNode = routineNodes[i];
    const id = rNode.getAttribute('id') || `rt-${i + 1}`;
    const title = rNode.getAttribute('title') || 'Rutina Personalizada';
    const days = parseInt(rNode.getAttribute('days') || '4', 10);
    const level = (rNode.getAttribute('level') as any) || 'intermediate';
    const focus = rNode.getAttribute('focus') || 'Acondicionamiento';

    const exercises: WorkoutExercise[] = [];
    const exNodes = rNode.getElementsByTagName('exercise');
    for (let j = 0; j < exNodes.length; j++) {
      const eNode = exNodes[j];
      exercises.push({
        id: eNode.getAttribute('id') || `ex-${j + 1}`,
        name: eNode.getAttribute('name') || 'Ejercicio',
        sets: parseInt(eNode.getAttribute('sets') || '3', 10),
        reps: eNode.getAttribute('reps') || '10-12',
        restSecs: parseInt(eNode.getAttribute('rest') || '60', 10),
        notes: eNode.getAttribute('notes') || undefined,
      });
    }

    routinesList.push({
      id,
      title,
      daysPerWeek: days,
      level,
      focus,
      exercises,
    });
  }

  // 3. Parse Clients
  const clientsList: Client[] = [];
  const clientNodes = xmlDoc.getElementsByTagName('client');

  for (let i = 0; i < clientNodes.length; i++) {
    const cNode = clientNodes[i];
    const id = cNode.getAttribute('id') || `cli-${i + 1}`;
    const status = (cNode.getAttribute('status') as ClientStatus) || 'active';
    const goal = (cNode.getAttribute('goal') as FitnessGoal) || 'hypertrophy';
    const paymentStatus = (cNode.getAttribute('payment_status') as PaymentStatus) || 'paid';
    const routineId = cNode.getAttribute('routine_id') || 'rt-1';

    const personalEl = cNode.getElementsByTagName('personal')[0];
    const fullName = personalEl?.getElementsByTagName('full_name')[0]?.textContent || 'Cliente';
    const email = personalEl?.getElementsByTagName('email')[0]?.textContent || '';
    const phone = personalEl?.getElementsByTagName('phone')[0]?.textContent || '';
    const age = parseInt(personalEl?.getElementsByTagName('age')[0]?.textContent || '25', 10);
    const gender = (personalEl?.getElementsByTagName('gender')[0]?.textContent as any) || 'M';
    const joinedDate = personalEl?.getElementsByTagName('joined_date')[0]?.textContent || '2026-01-01';
    const monthlyFeeUsd = parseFloat(personalEl?.getElementsByTagName('monthly_fee')[0]?.textContent || '100');

    const nutEl = cNode.getElementsByTagName('nutrition')[0];
    const nutrition = {
      dailyCalories: parseInt(nutEl?.getAttribute('calories') || '2200', 10),
      proteinGrams: parseInt(nutEl?.getAttribute('protein') || '150', 10),
      carbsGrams: parseInt(nutEl?.getAttribute('carbs') || '250', 10),
      fatsGrams: parseInt(nutEl?.getAttribute('fats') || '60', 10),
      waterLiters: parseFloat(nutEl?.getAttribute('water') || '3.0'),
    };

    const records: AnthropometricRecord[] = [];
    const recNodes = cNode.getElementsByTagName('record');
    for (let k = 0; k < recNodes.length; k++) {
      const rec = recNodes[k];
      records.push({
        date: rec.getAttribute('date') || '2026-01-01',
        weightKg: parseFloat(rec.getAttribute('weight') || '70'),
        bodyFatPercentage: parseFloat(rec.getAttribute('body_fat') || '20'),
        muscleMassKg: parseFloat(rec.getAttribute('muscle') || '30'),
      });
    }

    // 4. Parse Fitia Daily Plan (<daily_plan>)
    const planEl = cNode.getElementsByTagName('daily_plan')[0];
    const waterEl = planEl?.getElementsByTagName('water_intake')[0];
    const waterGlasses = parseInt(waterEl?.getAttribute('glasses') || '6', 10);
    const targetWaterGlasses = parseInt(waterEl?.getAttribute('target') || '12', 10);

    const mealNodes = planEl ? planEl.getElementsByTagName('meal') : [];
    const mealsList: MealLog[] = [];

    const defaultMealTypes: { type: MealType; name: string; targetKcal: number }[] = [
      { type: 'breakfast', name: 'Desayuno', targetKcal: Math.round(nutrition.dailyCalories * 0.25) },
      { type: 'lunch', name: 'Almuerzo', targetKcal: Math.round(nutrition.dailyCalories * 0.35) },
      { type: 'snack', name: 'Merienda', targetKcal: Math.round(nutrition.dailyCalories * 0.15) },
      { type: 'dinner', name: 'Cena', targetKcal: Math.round(nutrition.dailyCalories * 0.25) },
    ];

    if (mealNodes.length > 0) {
      for (let m = 0; m < mealNodes.length; m++) {
        const mNode = mealNodes[m];
        const mType = (mNode.getAttribute('type') as MealType) || 'breakfast';
        const mName = mNode.getAttribute('name') || 'Comida';
        const mTargetKcal = parseInt(mNode.getAttribute('target_kcal') || '500', 10);

        const foodsList: FoodItem[] = [];
        const foodNodes = mNode.getElementsByTagName('food');
        for (let f = 0; f < foodNodes.length; f++) {
          const fNode = foodNodes[f];
          foodsList.push({
            id: fNode.getAttribute('id') || `f-${f + 1}`,
            name: fNode.getAttribute('name') || 'Alimento',
            category: (fNode.getAttribute('category') as any) || 'protein',
            grams: parseInt(fNode.getAttribute('grams') || '100', 10),
            kcal: parseInt(fNode.getAttribute('kcal') || '150', 10),
            protein: parseFloat(fNode.getAttribute('protein') || '10'),
            carbs: parseFloat(fNode.getAttribute('carbs') || '15'),
            fats: parseFloat(fNode.getAttribute('fats') || '5'),
            checked: fNode.getAttribute('checked') === 'true',
          });
        }

        mealsList.push({
          id: `meal-${mType}-${id}`,
          type: mType,
          name: mName,
          targetKcal: mTargetKcal,
          foods: foodsList,
        });
      }
    } else {
      // Create empty default meals if none in XML
      defaultMealTypes.forEach((def) => {
        mealsList.push({
          id: `meal-${def.type}-${id}`,
          type: def.type,
          name: def.name,
          targetKcal: def.targetKcal,
          foods: [],
        });
      });
    }

    const dailyLog: DailyNutritionLog = {
      date: planEl?.getAttribute('date') || new Date().toISOString().split('T')[0],
      waterGlasses,
      targetWaterGlasses,
      meals: mealsList,
    };

    const assignedRoutine = routinesList.find((r) => r.id === routineId);

    clientsList.push({
      id,
      fullName,
      email,
      phone,
      age,
      gender,
      goal,
      status,
      joinedDate,
      monthlyFeeUsd,
      paymentStatus,
      assignedRoutineId: routineId,
      assignedRoutineName: assignedRoutine ? assignedRoutine.title : 'Rutina Estándar',
      nutrition,
      records,
      dailyLog,
    });
  }

  return {
    brand,
    routines: routinesList,
    clients: clientsList,
    rawXml: xmlString,
  };
}

/**
 * Serializes state back to XML format
 */
export function serializeFitCoachToXml(
  brand: BrandConfig,
  routines: WorkoutRoutine[],
  clients: Client[]
): string {
  const escapeXml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<fitcoach_database version="1.0" exported_at="${new Date().toISOString()}">\n`;

  // Brand
  xml += `  <brand>\n`;
  xml += `    <brand_name>${escapeXml(brand.brandName)}</brand_name>\n`;
  xml += `    <coach_name>${escapeXml(brand.coachName)}</coach_name>\n`;
  xml += `    <coach_title>${escapeXml(brand.coachTitle)}</coach_title>\n`;
  xml += `    <subdomain>${escapeXml(brand.subdomain)}</subdomain>\n`;
  xml += `    <primary_color>${brand.primaryColor}</primary_color>\n`;
  xml += `    <accent_color>${brand.accentColor}</accent_color>\n`;
  xml += `    <logo_icon>${brand.logoIcon}</logo_icon>\n`;
  xml += `    <support_email>${escapeXml(brand.supportEmail)}</support_email>\n`;
  xml += `    <currency>${brand.currency}</currency>\n`;
  xml += `  </brand>\n\n`;

  // Routines
  xml += `  <routines>\n`;
  routines.forEach((r) => {
    xml += `    <routine id="${r.id}" title="${escapeXml(r.title)}" days="${r.daysPerWeek}" level="${r.level}" focus="${escapeXml(r.focus)}">\n`;
    xml += `      <exercises>\n`;
    r.exercises.forEach((ex) => {
      const notesAttr = ex.notes ? ` notes="${escapeXml(ex.notes)}"` : '';
      xml += `        <exercise id="${ex.id}" name="${escapeXml(ex.name)}" sets="${ex.sets}" reps="${ex.reps}" rest="${ex.restSecs}"${notesAttr} />\n`;
    });
    xml += `      </exercises>\n`;
    xml += `    </routine>\n`;
  });
  xml += `  </routines>\n\n`;

  // Clients
  xml += `  <clients>\n`;
  clients.forEach((c) => {
    xml += `    <client id="${c.id}" status="${c.status}" goal="${c.goal}" payment_status="${c.paymentStatus}" routine_id="${c.assignedRoutineId}">\n`;
    xml += `      <personal>\n`;
    xml += `        <full_name>${escapeXml(c.fullName)}</full_name>\n`;
    xml += `        <email>${escapeXml(c.email)}</email>\n`;
    xml += `        <phone>${escapeXml(c.phone)}</phone>\n`;
    xml += `        <age>${c.age}</age>\n`;
    xml += `        <gender>${c.gender}</gender>\n`;
    xml += `        <joined_date>${c.joinedDate}</joined_date>\n`;
    xml += `        <monthly_fee>${c.monthlyFeeUsd}</monthly_fee>\n`;
    xml += `      </personal>\n`;
    xml += `      <nutrition calories="${c.nutrition.dailyCalories}" protein="${c.nutrition.proteinGrams}" carbs="${c.nutrition.carbsGrams}" fats="${c.nutrition.fatsGrams}" water="${c.nutrition.waterLiters}" />\n`;

    xml += `      <records>\n`;
    c.records.forEach((rec) => {
      xml += `        <record date="${rec.date}" weight="${rec.weightKg}" body_fat="${rec.bodyFatPercentage}" muscle="${rec.muscleMassKg}" />\n`;
    });
    xml += `      </records>\n`;

    if (c.dailyLog) {
      xml += `      <daily_plan date="${c.dailyLog.date}">\n`;
      xml += `        <water_intake glasses="${c.dailyLog.waterGlasses}" target="${c.dailyLog.targetWaterGlasses}" />\n`;
      c.dailyLog.meals.forEach((m) => {
        xml += `        <meal type="${m.type}" name="${escapeXml(m.name)}" target_kcal="${m.targetKcal}">\n`;
        m.foods.forEach((f) => {
          xml += `          <food id="${f.id}" name="${escapeXml(f.name)}" category="${f.category}" grams="${f.grams}" kcal="${f.kcal}" protein="${f.protein}" carbs="${f.carbs}" fats="${f.fats}" checked="${f.checked}" />\n`;
        });
        xml += `        </meal>\n`;
      });
      xml += `      </daily_plan>\n`;
    }

    xml += `    </client>\n`;
  });
  xml += `  </clients>\n`;
  xml += `</fitcoach_database>`;

  return xml;
}

export function loadDatabaseFromStorage(): ParsedDatabase {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return parseFitCoachXml(saved);
    } catch {
      // fallback
    }
  }
  return parseFitCoachXml(INITIAL_FITCOACH_XML);
}

export function saveDatabaseToStorage(xmlString: string): void {
  localStorage.setItem(STORAGE_KEY, xmlString);
}

export function resetDatabaseToInitial(): ParsedDatabase {
  localStorage.removeItem(STORAGE_KEY);
  return parseFitCoachXml(INITIAL_FITCOACH_XML);
}

export function downloadXmlFile(xmlContent: string, filename = 'fitcoach_database.xml') {
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readXmlFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve((e.target?.result as string) || '');
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}
