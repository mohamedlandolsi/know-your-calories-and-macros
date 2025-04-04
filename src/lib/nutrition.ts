// Nutrition calculation utilities

// Activity level multipliers
export const activityMultipliers = {
  sedentary: 1.2, // little to no exercise
  lightlyActive: 1.375, // light exercise/sports 1-3 days/week
  moderatelyActive: 1.55, // moderate exercise/sports 3-5 days/week
  veryActive: 1.725, // hard exercise/sports 6-7 days a week
  extraActive: 1.9, // very hard exercise/physical job & exercise
};

type Gender = "male" | "female";
type ActivityLevel = keyof typeof activityMultipliers;
type Goal = "cut" | "maintain" | "bulk";

interface CalculationInput {
  gender: Gender;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  activityLevel: ActivityLevel;
  bodyFatPercentage?: number; // optional
  goal: Goal;
}

interface MacroRange {
  min: number;
  max: number;
}

export interface NutritionResult {
  calories: MacroRange;
  protein: MacroRange; // in grams
  fats: MacroRange; // in grams
  carbs: MacroRange; // in grams
}

// Convert imperial height (ft, in) to cm
export function imperialHeightToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

// Convert imperial weight (lbs) to kg
export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

// Mifflin-St Jeor equation for BMR (Basal Metabolic Rate)
function calculateBMR(gender: Gender, weight: number, height: number, age: number): number {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Calculate maintenance calories
function calculateMaintenanceCalories(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * activityMultipliers[activityLevel];
}

// Calculate calories based on goal
function calculateCaloriesForGoal(maintenanceCalories: number, goal: Goal): MacroRange {
  switch (goal) {
    case "cut":
      return {
        min: Math.round(maintenanceCalories * 0.8), // 20% deficit
        max: Math.round(maintenanceCalories * 0.9), // 10% deficit
      };
    case "maintain":
      return {
        min: Math.round(maintenanceCalories),
        max: Math.round(maintenanceCalories + 100),
      };
    case "bulk":
      return {
        min: Math.round(maintenanceCalories),
        max: Math.round(maintenanceCalories * 1.1), // 10% surplus
      };
  }
}

// Calculate protein requirements (1.6g to 2.2g per kg of bodyweight)
function calculateProtein(weightKg: number): MacroRange {
  return {
    min: Math.round(weightKg * 1.6),
    max: Math.round(weightKg * 2.2),
  };
}

// Calculate fat requirements (14% to 20% of total calories)
function calculateFat(calories: MacroRange): MacroRange {
  return {
    min: Math.round((calories.min * 0.14) / 9), // 14% of calories, divided by 9 calories per gram of fat
    max: Math.round((calories.max * 0.2) / 9), // 20% of calories, divided by 9 calories per gram of fat
  };
}

// Calculate remaining calories as carbohydrates
function calculateCarbs(calories: MacroRange, protein: MacroRange, fat: MacroRange): MacroRange {
  // Protein and carbs have 4 calories per gram, fat has 9 calories per gram
  const minProteinCalories = protein.min * 4;
  const maxProteinCalories = protein.max * 4;
  const minFatCalories = fat.min * 9;
  const maxFatCalories = fat.max * 9;

  return {
    min: Math.round((calories.min - maxProteinCalories - maxFatCalories) / 4),
    max: Math.round((calories.max - minProteinCalories - minFatCalories) / 4),
  };
}

// Main function to calculate all nutrition requirements
export function calculateNutrition(input: CalculationInput): NutritionResult {
  const bmr = calculateBMR(input.gender, input.weight, input.height, input.age);
  const maintenanceCalories = calculateMaintenanceCalories(bmr, input.activityLevel);
  const calories = calculateCaloriesForGoal(maintenanceCalories, input.goal);
  const protein = calculateProtein(input.weight);
  const fat = calculateFat(calories);
  const carbs = calculateCarbs(calories, protein, fat);

  return {
    calories,
    protein,
    fats: fat,
    carbs,
  };
}