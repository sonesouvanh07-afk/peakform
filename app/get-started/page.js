"use client";

import { useState } from "react";

// ---- Meal database ----

const meals = [
  // Breakfasts (10)
  { name: "Oatmeal with banana and peanut butter", type: "breakfast", calories: 450, protein: 14, fat: 16, carbs: 62 },
  { name: "Three-egg omelette with spinach and cheese", type: "breakfast", calories: 390, protein: 27, fat: 29, carbs: 5 },
  { name: "Greek yogurt parfait with granola and berries", type: "breakfast", calories: 410, protein: 25, fat: 11, carbs: 52 },
  { name: "Whey protein smoothie with oats and banana", type: "breakfast", calories: 520, protein: 40, fat: 9, carbs: 70 },
  { name: "Avocado toast with two poached eggs", type: "breakfast", calories: 470, protein: 19, fat: 27, carbs: 38 },
  { name: "Khao Tom (Thai pork rice soup)", type: "breakfast", calories: 375, protein: 23, fat: 9, carbs: 50 },
  { name: "Scrambled eggs with whole-wheat toast", type: "breakfast", calories: 405, protein: 26, fat: 20, carbs: 30 },
  { name: "Pho Bo (Vietnamese beef noodle soup)", type: "breakfast", calories: 455, protein: 31, fat: 10, carbs: 60 },
  { name: "Banana protein pancakes", type: "breakfast", calories: 515, protein: 34, fat: 13, carbs: 66 },
  { name: "Nasi Lemak (coconut rice, egg, peanuts, sambal)", type: "breakfast", calories: 615, protein: 16, fat: 29, carbs: 73 },

  // Lunches (12)
  { name: "Grilled chicken and rice bowl with vegetables", type: "lunch", calories: 595, protein: 45, fat: 14, carbs: 72 },
  { name: "Turkey and avocado sandwich on whole grain", type: "lunch", calories: 515, protein: 32, fat: 20, carbs: 52 },
  { name: "Larb Gai (Thai minced chicken salad) with sticky rice", type: "lunch", calories: 525, protein: 38, fat: 14, carbs: 62 },
  { name: "Quinoa salad with chickpeas and feta", type: "lunch", calories: 475, protein: 18, fat: 19, carbs: 58 },
  { name: "Bun Cha (Vietnamese grilled pork with noodles)", type: "lunch", calories: 620, protein: 36, fat: 22, carbs: 70 },
  { name: "Tuna poke bowl with brown rice", type: "lunch", calories: 550, protein: 40, fat: 13, carbs: 68 },
  { name: "Khao Pad (Thai chicken fried rice)", type: "lunch", calories: 610, protein: 30, fat: 20, carbs: 78 },
  { name: "Caesar salad with grilled chicken", type: "lunch", calories: 490, protein: 42, fat: 26, carbs: 22 },
  { name: "Nasi Goreng (Indonesian fried rice with chicken and egg)", type: "lunch", calories: 655, protein: 32, fat: 22, carbs: 82 },
  { name: "Beef and broccoli stir-fry with jasmine rice", type: "lunch", calories: 635, protein: 42, fat: 18, carbs: 76 },
  { name: "Som Tam (green papaya salad) with grilled chicken", type: "lunch", calories: 430, protein: 34, fat: 14, carbs: 42 },
  { name: "Lentil soup with a whole-grain roll", type: "lunch", calories: 425, protein: 22, fat: 9, carbs: 64 },

  // Dinners (12)
  { name: "Baked salmon with sweet potato and asparagus", type: "dinner", calories: 545, protein: 40, fat: 24, carbs: 42 },
  { name: "Grilled steak with mashed potatoes and green beans", type: "dinner", calories: 630, protein: 46, fat: 28, carbs: 48 },
  { name: "Pad Krapow Gai (Thai basil chicken) with rice", type: "dinner", calories: 645, protein: 38, fat: 22, carbs: 74 },
  { name: "Khao Soi (Northern Thai curry noodle soup) with chicken", type: "dinner", calories: 690, protein: 33, fat: 30, carbs: 72 },
  { name: "Chicken breast with quinoa and roasted vegetables", type: "dinner", calories: 585, protein: 48, fat: 16, carbs: 62 },
  { name: "Tom Yum Goong (Thai shrimp soup) with rice", type: "dinner", calories: 515, protein: 36, fat: 10, carbs: 70 },
  { name: "Spaghetti with turkey meatballs and marinara", type: "dinner", calories: 625, protein: 38, fat: 18, carbs: 78 },
  { name: "Sticky rice with Thai grilled chicken (Gai Yang)", type: "dinner", calories: 640, protein: 44, fat: 16, carbs: 80 },
  { name: "Beef pho with extra brisket", type: "dinner", calories: 525, protein: 38, fat: 12, carbs: 66 },
  { name: "Baked cod with rice and stir-fried bok choy", type: "dinner", calories: 525, protein: 42, fat: 11, carbs: 64 },
  { name: "Pork stir-fry with jasmine rice", type: "dinner", calories: 655, protein: 40, fat: 22, carbs: 74 },
  { name: "Tofu and vegetable green curry with rice", type: "dinner", calories: 595, protein: 22, fat: 26, carbs: 68 },

  // Snacks (6)
  { name: "Apple with peanut butter", type: "snack", calories: 295, protein: 8, fat: 16, carbs: 30 },
  { name: "Protein bar", type: "snack", calories: 250, protein: 20, fat: 8, carbs: 24 },
  { name: "Greek yogurt with honey", type: "snack", calories: 220, protein: 18, fat: 4, carbs: 28 },
  { name: "Cottage cheese with pineapple", type: "snack", calories: 230, protein: 24, fat: 5, carbs: 22 },
  { name: "Handful of mixed nuts and dried fruit", type: "snack", calories: 340, protein: 9, fat: 22, carbs: 26 },
  { name: "Protein shake with a banana", type: "snack", calories: 315, protein: 27, fat: 6, carbs: 38 },

  // Bulker-friendly high-calorie meals (10) — for users with large calorie targets
  { name: "Mass-gainer oatmeal bowl (oats, banana, peanut butter, protein powder, milk)", type: "breakfast", calories: 880, protein: 52, fat: 26, carbs: 110 },
  { name: "Triple-egg omelette with avocado toast and sausage", type: "breakfast", calories: 800, protein: 38, fat: 57, carbs: 34 },
  { name: "Bun Cha (Vietnamese grilled pork with rice noodles) — large bowl", type: "lunch", calories: 850, protein: 48, fat: 32, carbs: 92 },
  { name: "Khao Mun Gai (Thai chicken and rice) — large bowl with extra chicken", type: "lunch", calories: 1000, protein: 62, fat: 30, carbs: 118 },
  { name: "Double chicken burrito bowl (rice, beans, cheese, guacamole)", type: "lunch", calories: 1050, protein: 60, fat: 34, carbs: 120 },
  { name: "Beef pho — large bowl with extra meat", type: "dinner", calories: 950, protein: 60, fat: 26, carbs: 118 },
  { name: "Salmon teriyaki bowl with double rice and edamame", type: "dinner", calories: 1000, protein: 52, fat: 30, carbs: 130 },
  { name: "Bulk plate: chicken, sweet potato, rice, and avocado", type: "dinner", calories: 1020, protein: 65, fat: 30, carbs: 122 },
  { name: "Peanut butter banana protein shake (oats, milk, honey, PB, protein powder)", type: "snack", calories: 600, protein: 38, fat: 18, carbs: 70 },
  { name: "Trail mix bowl with Greek yogurt and honey", type: "snack", calories: 560, protein: 26, fat: 26, carbs: 56 },
];

function scoreMeal(meal, targetCalories, targetProtein, targetFat, targetCarbs) {
  return (
    Math.abs(meal.calories - targetCalories) +
    Math.abs(meal.protein - targetProtein) * 4 +
    Math.abs(meal.fat - targetFat) * 9 +
    Math.abs(meal.carbs - targetCarbs) * 4
  );
}

function pickMealPlan(calorieTarget, proteinTarget, fatTarget, carbsTarget) {
  // Allocate % of daily intake per meal type
  const allocation = {
    breakfast: 0.25,
    lunch: 0.3,
    dinner: 0.3,
    snack: 0.15,
  };

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
  const picks = {};
  let remainingCals = calorieTarget;
  let remainingProtein = proteinTarget;
  let remainingFat = fatTarget;
  let remainingCarbs = carbsTarget;

  for (const type of mealTypes) {
    const targetCals = calorieTarget * allocation[type];
    const targetProt = proteinTarget * allocation[type];
    const targetFat = fatTarget * allocation[type];
    const targetCarbs = carbsTarget * allocation[type];

    const candidates = meals.filter((m) => m.type === type);
    if (candidates.length === 0) continue;

    // Score every candidate, pick lowest
    let bestMeal = candidates[0];
    let bestScore = scoreMeal(bestMeal, targetCals, targetProt, targetFat, targetCarbs);

    for (const meal of candidates) {
      const score = scoreMeal(meal, targetCals, targetProt, targetFat, targetCarbs);
      if (score < bestScore) {
        bestScore = score;
        bestMeal = meal;
      }
    }

    picks[type] = bestMeal;
    remainingCals -= bestMeal.calories;
    remainingProtein -= bestMeal.protein;
    remainingFat -= bestMeal.fat;
    remainingCarbs -= bestMeal.carbs;
  }

  // Calculate totals
  const totals = {
    calories: picks.breakfast.calories + picks.lunch.calories + picks.dinner.calories + picks.snack.calories,
    protein: picks.breakfast.protein + picks.lunch.protein + picks.dinner.protein + picks.snack.protein,
    fat: picks.breakfast.fat + picks.lunch.fat + picks.dinner.fat + picks.snack.fat,
    carbs: picks.breakfast.carbs + picks.lunch.carbs + picks.dinner.carbs + picks.snack.carbs,
  };

  return { picks, totals };
}

// ---- Workout templates ----

const workoutTemplates = {
  fullBodyBeginner: {
    name: "Full Body — Beginner",
    daysPerWeek: 3,
    description:
      "Three full-body sessions a week built around the basic compound lifts. Designed for new lifters who need to learn movement patterns and build a foundation before splitting up training.",
    days: [
      {
        name: "Day 1 – Full Body A",
        focus: "Quads, chest, back",
        exercises: [
          { name: "Back Squat", sets: 3, reps: "8-10" },
          { name: "Bench Press", sets: 3, reps: "8-10" },
          { name: "Barbell Row", sets: 3, reps: "8-10" },
          { name: "Overhead Press", sets: 3, reps: "10-12" },
          { name: "Plank", sets: 3, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 2 – Full Body B",
        focus: "Posterior chain, push, pull",
        exercises: [
          { name: "Deadlift", sets: 3, reps: "6-8" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8-10" },
          { name: "Lat Pulldown", sets: 3, reps: "10-12" },
          { name: "Goblet Squat", sets: 3, reps: "10-12" },
          { name: "Tricep Pushdown", sets: 3, reps: "12-15" },
          { name: "Hanging Knee Raise", sets: 3, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 3 – Full Body C",
        focus: "Legs, chest, arms",
        exercises: [
          { name: "Leg Press", sets: 3, reps: "10-12" },
          { name: "Dumbbell Bench Press", sets: 3, reps: "10-12" },
          { name: "Seated Cable Row", sets: 3, reps: "10-12" },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12" },
          { name: "Bicep Curl", sets: 3, reps: "12-15" },
          { name: "Tricep Extension", sets: 3, reps: "12-15" },
        ],
      },
    ],
  },

  upperLowerSplit: {
    name: "Upper/Lower Split",
    daysPerWeek: 4,
    description:
      "Four sessions a week alternating upper and lower body. A balanced step up from full-body training for intermediate lifters who can recover from more volume per muscle group.",
    days: [
      {
        name: "Day 1 – Upper (Strength)",
        focus: "Chest, back, shoulders",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "6-8" },
          { name: "Barbell Row", sets: 4, reps: "6-8" },
          { name: "Overhead Press", sets: 3, reps: "8-10" },
          { name: "Pull-Up", sets: 3, reps: "AMRAP" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8-10" },
          { name: "Face Pull", sets: 3, reps: "12-15" },
        ],
      },
      {
        name: "Day 2 – Lower (Strength)",
        focus: "Quads, hamstrings, glutes",
        exercises: [
          { name: "Back Squat", sets: 4, reps: "6-8" },
          { name: "Romanian Deadlift", sets: 4, reps: "8-10" },
          { name: "Leg Press", sets: 3, reps: "10-12" },
          { name: "Walking Lunge", sets: 3, reps: "10-12" },
          { name: "Standing Calf Raise", sets: 4, reps: "12-15" },
          { name: "Hanging Leg Raise", sets: 3, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 3 – Upper (Hypertrophy)",
        focus: "Chest, back, arms",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "8-10" },
          { name: "Lat Pulldown", sets: 4, reps: "10-12" },
          { name: "Seated Dumbbell Press", sets: 3, reps: "10-12" },
          { name: "Cable Row", sets: 3, reps: "10-12" },
          { name: "Lateral Raise", sets: 3, reps: "12-15" },
          { name: "Bicep Curl", sets: 3, reps: "10-12" },
          { name: "Tricep Pushdown", sets: 3, reps: "12-15" },
        ],
      },
      {
        name: "Day 4 – Lower (Hypertrophy)",
        focus: "Glutes, hamstrings, quads",
        exercises: [
          { name: "Front Squat", sets: 4, reps: "8-10" },
          { name: "Hip Thrust", sets: 4, reps: "8-10" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10-12" },
          { name: "Leg Curl", sets: 3, reps: "10-12" },
          { name: "Leg Extension", sets: 3, reps: "12-15" },
          { name: "Seated Calf Raise", sets: 4, reps: "12-15" },
        ],
      },
    ],
  },

  pushPullLegs: {
    name: "Push / Pull / Legs",
    daysPerWeek: 6,
    description:
      "Six sessions a week split into push (chest/shoulders/triceps), pull (back/biceps), and legs, repeated twice. High-volume programming for advanced lifters who can recover from training six days a week.",
    days: [
      {
        name: "Day 1 – Push (Strength)",
        focus: "Chest, shoulders, triceps",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "6-8" },
          { name: "Overhead Press", sets: 4, reps: "8-10" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8-10" },
          { name: "Lateral Raise", sets: 3, reps: "12-15" },
          { name: "Tricep Pushdown", sets: 3, reps: "10-12" },
          { name: "Overhead Tricep Extension", sets: 3, reps: "10-12" },
        ],
      },
      {
        name: "Day 2 – Pull (Strength)",
        focus: "Back, biceps",
        exercises: [
          { name: "Deadlift", sets: 4, reps: "5" },
          { name: "Pull-Up", sets: 4, reps: "AMRAP" },
          { name: "Barbell Row", sets: 3, reps: "8-10" },
          { name: "Lat Pulldown", sets: 3, reps: "10-12" },
          { name: "Face Pull", sets: 3, reps: "12-15" },
          { name: "Barbell Curl", sets: 3, reps: "8-10" },
        ],
      },
      {
        name: "Day 3 – Legs (Strength)",
        focus: "Quads, hamstrings, glutes, calves",
        exercises: [
          { name: "Back Squat", sets: 4, reps: "6-8" },
          { name: "Romanian Deadlift", sets: 4, reps: "8-10" },
          { name: "Leg Press", sets: 3, reps: "10-12" },
          { name: "Leg Curl", sets: 3, reps: "10-12" },
          { name: "Standing Calf Raise", sets: 4, reps: "12-15" },
          { name: "Hanging Leg Raise", sets: 3, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 4 – Push (Hypertrophy)",
        focus: "Chest, shoulders, triceps",
        exercises: [
          { name: "Incline Bench Press", sets: 4, reps: "8-10" },
          { name: "Seated Dumbbell Press", sets: 4, reps: "8-10" },
          { name: "Dumbbell Fly", sets: 3, reps: "10-12" },
          { name: "Lateral Raise", sets: 3, reps: "12-15" },
          { name: "Close-Grip Bench Press", sets: 3, reps: "8-10" },
          { name: "Cable Tricep Kickback", sets: 3, reps: "12-15" },
        ],
      },
      {
        name: "Day 5 – Pull (Hypertrophy)",
        focus: "Back, biceps",
        exercises: [
          { name: "Bent-Over Row", sets: 4, reps: "8-10" },
          { name: "Chin-Up", sets: 4, reps: "AMRAP" },
          { name: "Seated Cable Row", sets: 3, reps: "10-12" },
          { name: "Straight-Arm Pulldown", sets: 3, reps: "12-15" },
          { name: "Preacher Curl", sets: 3, reps: "10-12" },
          { name: "Hammer Curl", sets: 3, reps: "12-15" },
        ],
      },
      {
        name: "Day 6 – Legs (Hypertrophy)",
        focus: "Glutes, hamstrings, quads, core",
        exercises: [
          { name: "Front Squat", sets: 4, reps: "8-10" },
          { name: "Hip Thrust", sets: 4, reps: "10-12" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10-12" },
          { name: "Leg Extension", sets: 3, reps: "12-15" },
          { name: "Seated Calf Raise", sets: 4, reps: "12-15" },
          { name: "Plank", sets: 3, reps: "AMRAP" },
        ],
      },
    ],
  },

  fatLossCircuit: {
    name: "Fat Loss Circuit",
    daysPerWeek: 4,
    description:
      "Four full-body circuit sessions a week with short rest between exercises and a cardio finisher to keep heart rate high. Built to preserve muscle and burn calories while in a caloric deficit.",
    days: [
      {
        name: "Day 1 – Full Body Circuit A",
        focus: "Total body + conditioning",
        exercises: [
          { name: "Goblet Squat", sets: 4, reps: "12-15" },
          { name: "Push-Up", sets: 4, reps: "AMRAP" },
          { name: "Dumbbell Row", sets: 4, reps: "10-12" },
          { name: "Dumbbell Romanian Deadlift", sets: 4, reps: "10-12" },
          { name: "Plank", sets: 4, reps: "AMRAP" },
          { name: "Rowing Machine Finisher (5 min)", sets: 1, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 2 – Full Body Circuit B",
        focus: "Total body + conditioning",
        exercises: [
          { name: "Kettlebell Swing", sets: 4, reps: "12-15" },
          { name: "Dumbbell Bench Press", sets: 4, reps: "10-12" },
          { name: "Lat Pulldown", sets: 4, reps: "10-12" },
          { name: "Walking Lunge", sets: 4, reps: "10-12" },
          { name: "Mountain Climbers", sets: 4, reps: "AMRAP" },
          { name: "Incline Treadmill Walk (10 min)", sets: 1, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 3 – Full Body Circuit C",
        focus: "Total body + conditioning",
        exercises: [
          { name: "Trap Bar Deadlift", sets: 4, reps: "8-10" },
          { name: "Dumbbell Shoulder Press", sets: 4, reps: "10-12" },
          { name: "Inverted Row", sets: 4, reps: "10-12" },
          { name: "Step-Up", sets: 4, reps: "10-12" },
          { name: "Russian Twist", sets: 4, reps: "12-15" },
          { name: "Battle Ropes Finisher (5 rounds)", sets: 1, reps: "AMRAP" },
        ],
      },
      {
        name: "Day 4 – Full Body Circuit D",
        focus: "Total body + conditioning",
        exercises: [
          { name: "Front Squat", sets: 4, reps: "10-12" },
          { name: "Incline Dumbbell Press", sets: 4, reps: "10-12" },
          { name: "Cable Row", sets: 4, reps: "10-12" },
          { name: "Hip Thrust", sets: 4, reps: "10-12" },
          { name: "Burpees", sets: 4, reps: "AMRAP" },
          { name: "Stationary Bike Finisher (10 min)", sets: 1, reps: "AMRAP" },
        ],
      },
    ],
  },
};

function pickWorkoutPlan(goal, activity) {
  if (goal === "lose") return workoutTemplates.fatLossCircuit;
  if (activity === "sedentary" || activity === "light") return workoutTemplates.fullBodyBeginner;
  if (activity === "moderate") return workoutTemplates.upperLowerSplit;
  return workoutTemplates.pushPullLegs;
}

// ---- Calculation functions ----

// Calculate BMR using Mifflin-St Jeor equation
function calculateBMR(sex, weight, height, age) {
    const base = (10 * weight) + (6.25 * height) - (5 * age);
    return sex === "male" ? base + 5 : base - 161;
  }
  
  // Calculate TDEE by multiplying BMR by activity multiplier
  function calculateTDEE(bmr, activity) {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9,
    };
    return bmr * multipliers[activity];
  }
  
  // Calculate daily calorie target based on goal
  function calculateCalorieTarget(tdee, goal) {
    if (goal === "lose") return tdee - 500;
    if (goal === "muscle") return tdee + 250;
    return tdee; // maintain
  }
  
  // Calculate macros (protein, fat, carbs in grams)
  function calculateMacros(weight, calorieTarget) {
    const weightInLbs = weight * 2.2;
    const protein = Math.round(weightInLbs * 1); // 1g per lb
    const fat = Math.round((calorieTarget * 0.25) / 9); // 25% of calories from fat
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const carbCalories = calorieTarget - proteinCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4);
    return { protein, fat, carbs };
  }
export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    sex: "male",
    age: "",
    height: "",
    weight: "",
    activity: "moderate",
    goal: "muscle",
  });
  const [results, setResults] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    const weight = Number(formData.weight);
    const height = Number(formData.height);
    const age = Number(formData.age);
  
    const bmr = calculateBMR(formData.sex, weight, height, age);
    const tdee = calculateTDEE(bmr, formData.activity);
    const calorieTarget = calculateCalorieTarget(tdee, formData.goal);
    const macros = calculateMacros(weight, calorieTarget);
    const workoutPlan = pickWorkoutPlan(formData.goal, formData.activity);
    const mealPlan = pickMealPlan(
      Math.round(calorieTarget),
      macros.protein,
      macros.fat,
      macros.carbs
    );

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calorieTarget: Math.round(calorieTarget),
      protein: macros.protein,
      fat: macros.fat,
      carbs: macros.carbs,
      workoutPlan,
      mealPlan,
    });
  }

  // How close the meal plan's calories land to the user's target (used below).
  // results is null before the form is submitted, so guard against that.
  const matchPercent = results
    ? Math.round(
        (results.mealPlan.totals.calories / results.calorieTarget) * 100
      )
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white px-6 py-12">
      <div className="max-w-xl mx-auto">
        {results === null ? (
        <>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          Tell us about yourself
        </h1>
        <p className="text-slate-300 text-center mb-10">
          We&apos;ll use this to build your personalized plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sex */}
          <div>
            <label className="block mb-2 font-medium">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 26"
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-2 font-medium">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="e.g. 175"
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-2 font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g. 70"
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500"
            />
          </div>

          {/* Activity */}
          <div>
            <label className="block mb-2 font-medium">Activity Level</label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (1–3 days/week)</option>
              <option value="moderate">Moderate (3–5 days/week)</option>
              <option value="very">Very active (6–7 days/week)</option>
              <option value="extra">Extremely active (physical job)</option>
            </select>
          </div>

          {/* Goal */}
          <div>
            <label className="block mb-2 font-medium">Your Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white"
            >
              <option value="lose">Lose fat</option>
              <option value="muscle">Gain muscle</option>
              <option value="maintain">Maintain / recomp</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-200 transition"
          >
            Calculate My Plan
          </button>
        </form>
        </>
        ) : (
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Your personalized plan
            </h1>
            <p className="text-slate-300">
              Hit these numbers daily to reach your goal.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">
              Calories per day
            </p>
            <p className="text-7xl font-bold">{results.calorieTarget}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Protein
              </p>
              <p className="text-3xl font-bold">{results.protein}g</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Fat
              </p>
              <p className="text-3xl font-bold">{results.fat}g</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">
                Carbs
              </p>
              <p className="text-3xl font-bold">{results.carbs}g</p>
            </div>
          </div>

          <div className="text-slate-400 text-sm text-center">
            BMR: {results.bmr} · TDEE: {results.tdee}
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Your Workout Plan</h2>

            <div className="bg-slate-800 rounded-lg p-6 space-y-2">
              <p className="text-2xl font-bold">{results.workoutPlan.name}</p>
              <p className="text-slate-400 text-sm">
                {results.workoutPlan.daysPerWeek} days per week
              </p>
              <p className="text-slate-300">
                {results.workoutPlan.description}
              </p>
            </div>

            <div className="space-y-4">
              {results.workoutPlan.days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="bg-slate-800 rounded-lg p-6 space-y-3"
                >
                  <div>
                    <h3 className="text-xl font-bold">{day.name}</h3>
                    <p className="text-slate-400 text-sm">{day.focus}</p>
                  </div>
                  <ul className="space-y-1 text-slate-200">
                    {day.exercises.map((exercise, exIndex) => (
                      <li key={exIndex}>
                        {exercise.name} — {exercise.sets} sets × {exercise.reps} reps
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold">
                Sample Day to Hit Your Macros
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                These are sample meals to get you started. Adjust portions to
                your preferences.
              </p>
            </div>

            {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
              const meal = results.mealPlan.picks[mealType];
              return (
                <div
                  key={mealType}
                  className="bg-slate-800 rounded-lg p-6"
                >
                  <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    {mealType}
                  </p>
                  <p className="text-xl font-bold">{meal.name}</p>
                  <p className="text-slate-300 text-sm mt-2">
                    {meal.calories} cal · {meal.protein}P · {meal.fat}F ·{" "}
                    {meal.carbs}C
                  </p>
                </div>
              );
            })}

            <div className="bg-slate-700 rounded-lg p-6">
              <p className="text-slate-300 text-xs uppercase tracking-wide mb-1">
                Daily Total
              </p>
              <p className="text-xl font-bold">
                {results.mealPlan.totals.calories.toLocaleString()} /{" "}
                {results.calorieTarget.toLocaleString()} cal · {matchPercent}%
                match
              </p>
              <p className="text-slate-300 text-sm mt-2">
                Protein: {results.mealPlan.totals.protein}g · Fat:{" "}
                {results.mealPlan.totals.fat}g · Carbs:{" "}
                {results.mealPlan.totals.carbs}g
              </p>
              <p
                className={
                  matchPercent >= 95
                    ? "text-emerald-400 text-sm mt-3"
                    : matchPercent >= 85
                    ? "text-amber-400 text-sm mt-3"
                    : "text-orange-400 text-sm mt-3"
                }
              >
                {matchPercent >= 95
                  ? "Great match — these meals get you within 5% of your target."
                  : matchPercent >= 85
                  ? "Close match — adjust portions slightly to hit your exact target."
                  : "Your calorie need is high. Consider adding extra snacks or larger portions to reach your full target."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setResults(null)}
            className="w-full bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-200 transition"
          >
            Start over
          </button>
        </div>
        )}
      </div>
    </main>
  );
}
