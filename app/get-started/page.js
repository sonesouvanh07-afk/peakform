"use client";

import { useState } from "react";

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
  
    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calorieTarget: Math.round(calorieTarget),
      protein: macros.protein,
      fat: macros.fat,
      carbs: macros.carbs,
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
