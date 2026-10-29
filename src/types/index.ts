export type FitnessGoal = 'hypertrophy' | 'fat_loss' | 'strength' | 'endurance' | 'rehab';
export type ClientStatus = 'active' | 'paused' | 'injured';
export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface AnthropometricRecord {
  date: string;
  weightKg: number;
  bodyFatPercentage: number;
  muscleMassKg: number;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSecs: number;
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  daysPerWeek: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  focus: string;
  exercises: WorkoutExercise[];
}

export interface NutritionPlan {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  waterLiters: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'vegetable' | 'fruit' | 'dairy';
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  checked: boolean;
}

export interface MealLog {
  id: string;
  type: MealType;
  name: string;
  targetKcal: number;
  foods: FoodItem[];
}

export interface DailyNutritionLog {
  date: string;
  waterGlasses: number;
  targetWaterGlasses: number;
  meals: MealLog[];
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Carnes & Proteínas' | 'Cereales & Granos' | 'Frutas & Verduras' | 'Lácteos & Grasas';
  totalGrams: number;
  unit: string;
  checked: boolean;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  goal: FitnessGoal;
  status: ClientStatus;
  joinedDate: string;
  monthlyFeeUsd: number;
  paymentStatus: PaymentStatus;
  assignedRoutineId: string;
  assignedRoutineName: string;
  nutrition: NutritionPlan;
  records: AnthropometricRecord[];
  dailyLog: DailyNutritionLog;
}

export interface BrandConfig {
  brandName: string;
  coachName: string;
  coachTitle: string;
  subdomain: string;
  primaryColor: string; // Hex color code e.g. #84cc16
  accentColor: string;
  logoIcon: 'dumbbell' | 'flame' | 'zap' | 'trophy' | 'crown' | 'activity';
  supportEmail: string;
  currency: string;
}

export interface DemoTrainer {
  id: string;
  name: string;
  email: string;
  specialty: string;
  certification: string;
  avatarUrl?: string;
}
