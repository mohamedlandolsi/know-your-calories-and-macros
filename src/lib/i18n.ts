import { createContext, useContext } from 'react';

export type Language = 'en' | 'fr' | 'ar';

// Language metadata
export const languages = {
  en: {
    name: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    flagImg: '/images/flags/gb.svg'
  },
  fr: {
    name: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
    flagImg: '/images/flags/fr.svg'
  },
  ar: {
    name: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    flagImg: '/images/flags/sa.svg'
  }
};

// Define the translation type
export type TranslationKey = keyof typeof translations.en;

// Translations
export const translations = {
  en: {
    appName: 'Know Your Calories and Macros',
    appDescription: 'Calculate your calories and macronutrients based on your body metrics and goals',
    calculate: 'Calculate Your Nutrition',
    calculating: 'Calculating...',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    age: 'Age (years)',
    heightMetric: 'Height (cm)',
    heightImperial: 'Height (ft\'in")',
    heightMetricPlaceholder: 'Height in cm',
    heightFtPlaceholder: 'Feet',
    heightInPlaceholder: 'Inches',
    weightMetric: 'Weight (kg)',
    weightImperial: 'Weight (lbs)',
    weightMetricPlaceholder: 'Weight in kg',
    weightImperialPlaceholder: 'Weight in lbs',
    activityLevel: 'Activity Level',
    activityLevelPlaceholder: 'Select activity level',
    sedentary: 'Sedentary (little to no exercise)',
    lightlyActive: 'Lightly Active (1-3 days/week)',
    moderatelyActive: 'Moderately Active (3-5 days/week)',
    veryActive: 'Very Active (6-7 days/week)',
    extraActive: 'Extra Active (very hard exercise & physical job)',
    bodyFatPercentage: 'Body Fat % (optional)',
    bodyFatPercentagePlaceholder: 'Body fat percentage',
    bodyFatPercentageDescription: 'Optional: Enter for more precise calculations',
    goal: 'Goal',
    goalPlaceholder: 'Select your goal',
    cut: 'Cut (lose fat)',
    maintain: 'Maintain (suitable for most people)',
    bulk: 'Bulk (gain weight)',
    metric: 'Metric (kg/cm)',
    imperial: 'Imperial (lbs/ft)',
    results: 'Your Results',
    dailyCalories: 'Daily Calories',
    macronutrients: 'Macronutrients',
    protein: 'Protein',
    fats: 'Fats',
    carbs: 'Carbs',
    caloricDeficit: 'Caloric deficit for fat loss (10-20% below maintenance)',
    caloricMaintenance: 'Calories to maintain your current weight',
    caloricSurplus: 'Caloric surplus for weight gain (up to 10% above maintenance)',
    resultsDescription: 'These values are estimations based on the Mifflin-St Jeor equation. For best results:',
    resultsTip1: 'Consume sufficient protein to maintain or build muscle mass',
    resultsTip2: 'Distribute your meals evenly throughout the day',
    resultsTip3: 'Adjust your intake based on your actual results over 2-4 weeks',
  },
  fr: {
    appName: 'Connaître Vos Calories et Macros',
    appDescription: 'Calculez vos calories et macronutriments en fonction de vos mesures corporelles et de vos objectifs',
    calculate: 'Calculer Votre Nutrition',
    calculating: 'Calcul en cours...',
    gender: 'Genre',
    male: 'Homme',
    female: 'Femme',
    age: 'Âge (ans)',
    heightMetric: 'Taille (cm)',
    heightImperial: 'Taille (pieds/pouces)',
    heightMetricPlaceholder: 'Taille en cm',
    heightFtPlaceholder: 'Pieds',
    heightInPlaceholder: 'Pouces',
    weightMetric: 'Poids (kg)',
    weightImperial: 'Poids (lbs)',
    weightMetricPlaceholder: 'Poids en kg',
    weightImperialPlaceholder: 'Poids en lbs',
    activityLevel: 'Niveau d\'Activité',
    activityLevelPlaceholder: 'Sélectionnez le niveau d\'activité',
    sedentary: 'Sédentaire (peu ou pas d\'exercice)',
    lightlyActive: 'Légèrement Actif (1-3 jours/semaine)',
    moderatelyActive: 'Modérément Actif (3-5 jours/semaine)',
    veryActive: 'Très Actif (6-7 jours/semaine)',
    extraActive: 'Extra Actif (exercice très intense & travail physique)',
    bodyFatPercentage: '% de Graisse Corporelle (optionnel)',
    bodyFatPercentagePlaceholder: 'Pourcentage de graisse corporelle',
    bodyFatPercentageDescription: 'Optionnel: Entrez pour des calculs plus précis',
    goal: 'Objectif',
    goalPlaceholder: 'Sélectionnez votre objectif',
    cut: 'Sécher (perdre de la graisse)',
    maintain: 'Maintenir (convient à la plupart des gens)',
    bulk: 'Prendre du volume (gagner du poids)',
    metric: 'Métrique (kg/cm)',
    imperial: 'Impérial (lbs/pieds)',
    results: 'Vos Résultats',
    dailyCalories: 'Calories Quotidiennes',
    macronutrients: 'Macronutriments',
    protein: 'Protéines',
    fats: 'Lipides',
    carbs: 'Glucides',
    caloricDeficit: 'Déficit calorique pour la perte de graisse (10-20% sous le maintien)',
    caloricMaintenance: 'Calories pour maintenir votre poids actuel',
    caloricSurplus: 'Surplus calorique pour la prise de poids (jusqu\'à 10% au-dessus du maintien)',
    resultsDescription: 'Ces valeurs sont des estimations basées sur l\'équation de Mifflin-St Jeor. Pour de meilleurs résultats:',
    resultsTip1: 'Consommez suffisamment de protéines pour maintenir ou développer votre masse musculaire',
    resultsTip2: 'Répartissez vos repas uniformément tout au long de la journée',
    resultsTip3: 'Ajustez votre apport en fonction de vos résultats réels sur 2-4 semaines',
  },
  ar: {
    appName: 'احسب السعرات والعناصر الغذائية',
    appDescription: 'احسب السعرات الحرارية والعناصر الغذائية بناءً على قياسات جسمك وأهدافك',
    calculate: 'احسب التغذية الخاصة بك',
    calculating: 'جاري الحساب...',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    age: 'العمر (سنوات)',
    heightMetric: 'الطول (سم)',
    heightImperial: 'الطول (قدم/بوصة)',
    heightMetricPlaceholder: 'الطول بالسنتيمتر',
    heightFtPlaceholder: 'قدم',
    heightInPlaceholder: 'بوصة',
    weightMetric: 'الوزن (كجم)',
    weightImperial: 'الوزن (رطل)',
    weightMetricPlaceholder: 'الوزن بالكيلوجرام',
    weightImperialPlaceholder: 'الوزن بالرطل',
    activityLevel: 'مستوى النشاط',
    activityLevelPlaceholder: 'اختر مستوى النشاط',
    sedentary: 'خامل (قليل أو لا تمارين)',
    lightlyActive: 'نشاط خفيف (1-3 أيام/أسبوع)',
    moderatelyActive: 'نشاط معتدل (3-5 أيام/أسبوع)',
    veryActive: 'نشاط عالي (6-7 أيام/أسبوع)',
    extraActive: 'نشاط مكثف (تمارين شاقة جدًا وعمل بدني)',
    bodyFatPercentage: 'نسبة الدهون (اختياري)',
    bodyFatPercentagePlaceholder: 'نسبة دهون الجسم',
    bodyFatPercentageDescription: 'اختياري: أدخل للحصول على حسابات أكثر دقة',
    goal: 'الهدف',
    goalPlaceholder: 'اختر هدفك',
    cut: 'تقليل الدهون (فقدان الوزن)',
    maintain: 'المحافظة (مناسب لمعظم الناس)',
    bulk: 'زيادة الكتلة (اكتساب الوزن)',
    metric: 'متري (كجم/سم)',
    imperial: 'إمبراطوري (رطل/قدم)',
    results: 'النتائج الخاصة بك',
    dailyCalories: 'السعرات اليومية',
    macronutrients: 'العناصر الغذائية الكبرى',
    protein: 'البروتين',
    fats: 'الدهون',
    carbs: 'الكربوهيدرات',
    caloricDeficit: 'عجز السعرات الحرارية لفقدان الدهون (10-20% أقل من الصيانة)',
    caloricMaintenance: 'سعرات حرارية للحفاظ على وزنك الحالي',
    caloricSurplus: 'فائض السعرات الحرارية لزيادة الوزن (حتى 10% فوق الصيانة)',
    resultsDescription: 'هذه القيم هي تقديرات تستند إلى معادلة ميفلين-سانت جيور. للحصول على أفضل النتائج:',
    resultsTip1: 'استهلك كمية كافية من البروتين للحفاظ على أو بناء كتلة العضلات',
    resultsTip2: 'وزع وجباتك بالتساوي على مدار اليوم',
    resultsTip3: 'اضبط استهلاكك بناءً على نتائجك الفعلية خلال 2-4 أسابيع',
  }
} as const;

// Type for the language context
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: string;
}

// Create the language context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
