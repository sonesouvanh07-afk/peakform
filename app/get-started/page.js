"use client";

import { useState } from "react";

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

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calorieTarget: Math.round(calorieTarget),
      protein: macros.protein,
      fat: macros.fat,
      carbs: macros.carbs,
      workoutPlan,
    });
  }

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
