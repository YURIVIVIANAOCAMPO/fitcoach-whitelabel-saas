import type {
  BrandConfig,
  WorkoutRoutine,
  Client,
  ClientStatus,
  PaymentStatus,
  MealType,
  FoodItem,
} from '../types';
import {
  loadDatabaseFromStorage,
  saveDatabaseToStorage,
  serializeFitCoachToXml,
} from './xmlService';

/**
 * PTcoach Mock API Layer
 * Simula contratos RESTful de backend donde la base de datos subyacente
 * se almacena, consulta y serializa mediante contratos XML.
 */
class PTcoachApiClient {
  private async delay(ms = 60): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // === CLIENTS API CONTRACTS ===
  async getClients(): Promise<Client[]> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    return db.clients;
  }

  async getClientById(id: string): Promise<Client | undefined> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    return db.clients.find((c) => c.id === id);
  }

  async createClient(newClient: Client): Promise<Client> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    const updated = [newClient, ...db.clients];
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
    return newClient;
  }

  async updateClientStatus(clientId: string, status: ClientStatus): Promise<void> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    const updated = db.clients.map((c) => (c.id === clientId ? { ...c, status } : c));
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
  }

  async updatePaymentStatus(clientId: string, paymentStatus: PaymentStatus): Promise<void> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    const updated = db.clients.map((c) => (c.id === clientId ? { ...c, paymentStatus } : c));
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
  }

  async deleteClient(clientId: string): Promise<void> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    const updated = db.clients.filter((c) => c.id !== clientId);
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
  }

  // === NUTRITION & MEALS CONTRACTS ===
  async toggleFoodCheck(clientId: string, mealType: MealType, foodId: string): Promise<void> {
    await this.delay(20);
    const db = loadDatabaseFromStorage();
    const updated = db.clients.map((c) => {
      if (c.id !== clientId) return c;
      const updatedMeals = c.dailyLog.meals.map((m) => {
        if (m.type !== mealType) return m;
        return {
          ...m,
          foods: m.foods.map((f) => (f.id === foodId ? { ...f, checked: !f.checked } : f)),
        };
      });
      return { ...c, dailyLog: { ...c.dailyLog, meals: updatedMeals } };
    });
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
  }

  async addFoodToMeal(clientId: string, mealType: MealType, food: FoodItem): Promise<void> {
    await this.delay(30);
    const db = loadDatabaseFromStorage();
    const updated = db.clients.map((c) => {
      if (c.id !== clientId) return c;
      const updatedMeals = c.dailyLog.meals.map((m) => {
        if (m.type !== mealType) return m;
        return { ...m, foods: [...m.foods, food] };
      });
      return { ...c, dailyLog: { ...c.dailyLog, meals: updatedMeals } };
    });
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
  }

  async deleteFoodFromMeal(clientId: string, mealType: MealType, foodId: string): Promise<void> {
    await this.delay(30);
    const db = loadDatabaseFromStorage();
    const updated = db.clients.map((c) => {
      if (c.id !== clientId) return c;
      const updatedMeals = c.dailyLog.meals.map((m) => {
        if (m.type !== mealType) return m;
        return { ...m, foods: m.foods.filter((f) => f.id !== foodId) };
      });
      return { ...c, dailyLog: { ...c.dailyLog, meals: updatedMeals } };
    });
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
  }

  async updateWaterGlasses(clientId: string, delta: number): Promise<number> {
    await this.delay(20);
    const db = loadDatabaseFromStorage();
    let newGlasses = 0;
    const updated = db.clients.map((c) => {
      if (c.id !== clientId) return c;
      newGlasses = Math.max(0, Math.min(30, c.dailyLog.waterGlasses + delta));
      return { ...c, dailyLog: { ...c.dailyLog, waterGlasses: newGlasses } };
    });
    const xml = serializeFitCoachToXml(db.brand, db.routines, updated);
    saveDatabaseToStorage(xml);
    return newGlasses;
  }

  // === ROUTINES CONTRACTS ===
  async getRoutines(): Promise<WorkoutRoutine[]> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    return db.routines;
  }

  async createRoutine(routine: WorkoutRoutine): Promise<WorkoutRoutine> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    const updated = [...db.routines, routine];
    const xml = serializeFitCoachToXml(db.brand, updated, db.clients);
    saveDatabaseToStorage(xml);
    return routine;
  }

  // === BRAND CONFIG CONTRACTS ===
  async getBrand(): Promise<BrandConfig> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    return db.brand;
  }

  async updateBrand(brand: BrandConfig): Promise<BrandConfig> {
    await this.delay();
    const db = loadDatabaseFromStorage();
    const xml = serializeFitCoachToXml(brand, db.routines, db.clients);
    saveDatabaseToStorage(xml);
    return brand;
  }
}

export const api = new PTcoachApiClient();
