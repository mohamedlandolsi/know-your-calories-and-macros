"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, Radio } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, Minus, TrendingUp, Pizza, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

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
  fat: MacroRange; // in grams
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
function calculateBMR(
  gender: Gender,
  weight: number,
  height: number,
  age: number
): number {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Calculate maintenance calories
function calculateMaintenanceCalories(
  bmr: number,
  activityLevel: ActivityLevel
): number {
  return bmr * activityMultipliers[activityLevel];
}

// Calculate calories based on goal
function calculateCaloriesForGoal(
  maintenanceCalories: number,
  goal: Goal
): MacroRange {
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
function calculateCarbs(
  calories: MacroRange,
  protein: MacroRange,
  fat: MacroRange
): MacroRange {
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
  const maintenanceCalories = calculateMaintenanceCalories(
    bmr,
    input.activityLevel
  );
  const calories = calculateCaloriesForGoal(maintenanceCalories, input.goal);
  const protein = calculateProtein(input.weight);
  const fat = calculateFat(calories);
  const carbs = calculateCarbs(calories, protein, fat);

  return {
    calories,
    protein,
    fat,
    carbs,
  };
}

type UnitSystem = "metric" | "imperial";

interface CalculatorFormValues {
  gender: "male" | "female";
  age: number;
  heightCm?: number;
  heightFt?: number;
  heightIn?: number;
  weightKg?: number;
  weightLbs?: number;
  activityLevel: keyof typeof activityMultipliers;
  bodyFatPercentage?: number;
  goal: "cut" | "maintain" | "bulk";
}

// Form animations
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const resultsVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function NutritionCalculator() {
  const { t, dir } = useLanguage();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [results, setResults] = useState<NutritionResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<CalculatorFormValues>({
    defaultValues: {
      gender: "male",
      age: 30,
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      weightKg: 75,
      weightLbs: 165,
      activityLevel: "moderatelyActive",
      goal: "maintain",
    },
  });

  function onSubmit(data: CalculatorFormValues) {
    setIsCalculating(true);

    // Short delay to show animation
    setTimeout(() => {
      try {
        // Convert imperial to metric if needed
        let heightCm = data.heightCm || 0;
        let weightKg = data.weightKg || 0;

        if (unitSystem === "imperial") {
          heightCm = imperialHeightToCm(data.heightFt || 0, data.heightIn || 0);
          weightKg = lbsToKg(data.weightLbs || 0);
        }

        const result = calculateNutrition({
          gender: data.gender,
          age: data.age,
          height: heightCm,
          weight: weightKg,
          activityLevel: data.activityLevel,
          bodyFatPercentage: data.bodyFatPercentage,
          goal: data.goal,
        });

        setResults(result);
      } catch (error) {
        console.error("Calculation error:", error);
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  }

  return (
    <div className="w-full max-w-3xl mx-auto" dir={dir}>
      <Card className="w-full shadow-lg border-opacity-40 backdrop-blur-sm card-glass hover-lift">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-center text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t("appName")}
              </span>
            </CardTitle>
            <CardDescription className="text-center mt-2">
              {t("appDescription")}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="metric"
            onValueChange={(v) => setUnitSystem(v as UnitSystem)}
            className="w-full"
          >
            <TabsList className="mb-6 mx-auto">
              <TabsTrigger value="metric">{t("metric")}</TabsTrigger>
              <TabsTrigger value="imperial">{t("imperial")}</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gender Selection */}
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>{t("gender")}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              className="flex gap-4"
                              onBlur={field.onBlur}
                            >
                              <Radio
                                name="gender"
                                value="male"
                                label={t("male")}
                                checked={field.value === "male"}
                                onChange={() => field.onChange("male")}
                              />
                              <Radio
                                name="gender"
                                value="female"
                                label={t("female")}
                                checked={field.value === "female"}
                                onChange={() => field.onChange("female")}
                              />
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Age */}
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("age")}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={15}
                              max={100}
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(e.target.value, 10) || ""
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Height - Metric */}
                  <TabsContent value="metric" className="mt-0">
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="heightCm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("heightMetric")}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={100}
                                max={250}
                                step={0.1}
                                placeholder={t("heightMetricPlaceholder")}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </TabsContent>

                  {/* Height - Imperial */}
                  <TabsContent value="imperial" className="mt-0">
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="heightFt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("heightImperial")}</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  type="number"
                                  min={3}
                                  max={8}
                                  placeholder={t("heightFtPlaceholder")}
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value, 10) || ""
                                    )
                                  }
                                  className="w-1/2 rounded-r-none"
                                />
                                <Input
                                  type="number"
                                  min={0}
                                  max={11.9}
                                  step={0.1}
                                  placeholder={t("heightInPlaceholder")}
                                  value={form.watch("heightIn") || ""}
                                  onChange={(e) =>
                                    form.setValue(
                                      "heightIn",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="w-1/2 rounded-l-none border-l-0"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </TabsContent>

                  {/* Weight - Metric */}
                  <TabsContent value="metric" className="mt-0">
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="weightKg"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("weightMetric")}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={30}
                                max={300}
                                step={0.1}
                                placeholder={t("weightMetricPlaceholder")}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </TabsContent>

                  {/* Weight - Imperial */}
                  <TabsContent value="imperial" className="mt-0">
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="weightLbs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("weightImperial")}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={60}
                                max={700}
                                step={0.1}
                                placeholder={t("weightImperialPlaceholder")}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </TabsContent>

                  {/* Activity Level */}
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("activityLevel")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("activityLevelPlaceholder")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">
                                {t("sedentary")}
                              </SelectItem>
                              <SelectItem value="lightlyActive">
                                {t("lightlyActive")}
                              </SelectItem>
                              <SelectItem value="moderatelyActive">
                                {t("moderatelyActive")}
                              </SelectItem>
                              <SelectItem value="veryActive">
                                {t("veryActive")}
                              </SelectItem>
                              <SelectItem value="extraActive">
                                {t("extraActive")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Body Fat Percentage - Optional */}
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="bodyFatPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("bodyFatPercentage")}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={3}
                              max={50}
                              step={0.1}
                              placeholder={t("bodyFatPercentagePlaceholder")}
                              {...field}
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            {t("bodyFatPercentageDescription")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Goal */}
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("goal")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("goal")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cut">
                                {t("cut")}
                              </SelectItem>
                              <SelectItem value="maintain">
                                {t("maintain")}
                              </SelectItem>
                              <SelectItem value="bulk">
                                {t("bulk")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div
                  variants={formItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full font-semibold text-base cursor-pointer"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("calculating")}
                      </span>
                    ) : (
                      t("calculate")
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>
          </Tabs>
        </CardContent>

        {results && (
          <CardFooter className="flex flex-col p-6">
            <motion.div
              className="w-full border-t border-border pt-6"
              variants={resultsVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-center mb-6 gap-2">
                <div className="h-px w-12 bg-primary/50"></div>
                <h3 className="text-xl font-semibold text-center relative">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {t("results")}
                  </span>
                </h3>
                <div className="h-px w-12 bg-primary/50"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card className="bg-secondary/20 hover:bg-secondary/30 transition-colors border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-primary/20">
                          {form.getValues().goal === "cut" && (
                            <TrendingDown className="h-5 w-5 text-primary" />
                          )}
                          {form.getValues().goal === "maintain" && (
                            <Minus className="h-5 w-5 text-primary" />
                          )}
                          {form.getValues().goal === "bulk" && (
                            <TrendingUp className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        {t("dailyCalories")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        {results.calories.min} - {results.calories.max}
                      </div>
                      <div className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p>
                          {form.getValues().goal === "cut" &&
                            t("caloricDeficit")}
                          {form.getValues().goal === "maintain" &&
                            t("caloricMaintenance")}
                          {form.getValues().goal === "bulk" &&
                            t("caloricSurplus")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card className="bg-secondary/20 hover:bg-secondary/30 transition-colors border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-primary/20">
                          <Pizza className="h-5 w-5 text-primary" />
                        </div>
                        {t("macronutrients")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mt-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[--chart-1] px-2 font-bold">
                              P
                            </Badge>
                            <span className="font-medium">{t("protein")}</span>
                          </div>
                          <span className="font-medium">
                            {results.protein.min}-{results.protein.max}g
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[--chart-2] px-2 font-bold">
                              F
                            </Badge>
                            <span className="font-medium">{t("fats")}</span>
                          </div>
                          <span className="font-medium">
                            {results.fat.min}-{results.fat.max}g
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[--chart-3] px-2 font-bold">
                              C
                            </Badge>
                            <span className="font-medium">{t("carbs")}</span>
                          </div>
                          <span className="font-medium">
                            {results.carbs.min}-{results.carbs.max}g
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 p-4 rounded-lg bg-secondary/10 border border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="flex gap-2 items-start">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("resultsDescription")}
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 list-disc pl-4 space-y-1">
                      <li>{t("resultsTip1")}</li>
                      <li>{t("resultsTip2")}</li>
                      <li>{t("resultsTip3")}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
