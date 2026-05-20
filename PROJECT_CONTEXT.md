# peakform — Project Context

> **Purpose of this file:** Give any AI coding assistant (Claude Code, Cursor, Copilot, etc.) or future collaborator complete context on this project in one read. **Read this fully before suggesting code changes.**

---

## 1. What is peakform?

A web app that gives users a personalized workout plan and meal plan based on their physical stats and fitness goals.

**User flow (target):**
1. User lands on homepage → clicks "Get Started"
2. Fills out a 6-question form (sex, age, height, weight, activity level, goal)
3. App calculates BMR, TDEE, daily calorie target, and macros
4. Displays a results page with their personalized numbers
5. Generates a workout plan from pre-built templates based on their goal
6. Generates a sample meal plan that hits their macro targets

**Live URL:** https://peakform-ashy.vercel.app
**GitHub:** https://github.com/sonesouvanh07-afk/peakform

---

## 2. About the developer (important context for how to help)

- **Skill level: Beginner.** This is their first real coding project.
- They know basic JavaScript syntax but **do not** know advanced patterns (closures, async/await, hooks beyond `useState`, etc.).
- They have a working dev environment: Node.js, npm, Git, GitHub CLI, VS Code, Vercel.
- They learn by doing, not by reading docs.
- **Goal:** Build an MVP by May 31 (~14 days from project start), then validate with real users.
- **NOT trying to:** ship a polished sellable product yet. Validation first, monetization later.

**How to communicate with them:**
- Use plain English, minimal jargon. Explain terms when used.
- Show, don't tell. Concrete examples over abstract theory.
- Break tasks into small steps. Confirm one step works before the next.
- When suggesting code, **explain WHAT it does and WHY** — not just paste it.
- Catch beginner mistakes early (extra braces, missing imports, unsaved files).
- Be direct about trade-offs and push back when ideas are unrealistic.

---

## 3. Tech stack

| Layer | Tech | Notes |
|---|---|---|
| Framework | **Next.js 16.2.6** | App Router, JavaScript (NOT TypeScript) |
| Styling | **Tailwind CSS 4** | Utility classes only, no custom CSS unless necessary |
| Language | **JavaScript** | Plain JS, no TypeScript |
| Linting | **ESLint** | Default Next.js config |
| Hosting | **Vercel** | Auto-deploys from `main` branch on GitHub push |
| Repo | **GitHub** | `sonesouvanh07-afk/peakform` |
| Editor | **VS Code** | With auto-save enabled |
| Package manager | **npm** | Not yarn or pnpm |

**Important config choices made during setup:**
- TypeScript: **No**
- ESLint: Yes
- Tailwind: Yes
- `src/` directory: **No** (code lives directly in `app/`)
- App Router: **Yes** (not Pages Router)
- Turbopack: **Yes**
- Import alias: **Default `@/*`** (not customized)
- React Compiler: **No** (too experimental for beginner)
- AGENTS.md: **Yes** (included for AI guidance)

---

## 4. Current project structure

```
peakform/
├── app/
│   ├── page.js                   # Homepage (landing page)
│   ├── layout.js                 # Root layout
│   ├── globals.css               # Global Tailwind styles
│   ├── favicon.ico
│   └── get-started/
│       └── page.js               # Form page (currently has a bug — see Section 7)
├── public/
├── AGENTS.md
├── CLAUDE.md
├── PROJECT_CONTEXT.md            # ← this file
├── package.json
├── next.config.mjs
└── (other config files)
```

**URLs in production:**
- `/` → landing page with hero + "Get Started" button
- `/get-started` → form page

---

## 5. What's built (✅) vs not built (⏳)

### ✅ Done
- Full dev environment setup
- Next.js project created with chosen options
- Code on GitHub
- Auto-deploy via Vercel working
- Homepage with branded landing (dark gradient, "peakform" title, tagline, "Get Started" button)
- "Get Started" button links to `/get-started` page
- Form page at `/get-started` with 6 fields (sex, age, height, weight, activity, goal)
- Form uses controlled inputs with `useState`
- 4 calculation functions written and placed above the component:
  - `calculateBMR(sex, weight, height, age)` — Mifflin-St Jeor
  - `calculateTDEE(bmr, activity)` — uses activity multipliers
  - `calculateCalorieTarget(tdee, goal)` — applies surplus/deficit
  - `calculateMacros(weight, calorieTarget)` — protein/fat/carbs in grams
- `handleSubmit` function rewritten to call the 4 functions and save results to `useState`
- `useState(null)` added for `results`

### ⏳ Not yet built
- **Currently blocked by bug** (see Section 7)
- UI to display results on the page (currently uses `alert()` for testing)
- Workout plan templates (3-5 hand-built)
- Workout plan picker logic (assigns template based on goal + days/week)
- Meal database (30-50 hand-curated meals with macros)
- Meal plan generator (picks meals that hit user's macros)
- Polish + mobile testing
- Showing the live URL to real users for feedback

### ❌ Intentionally NOT in v1 (cut to ship by May 31)
- User authentication / accounts
- Saving plans to a database
- Payments / subscriptions
- AI-generated plans (we use rule-based instead)
- Progress tracking, food logging
- Body fat % estimation
- Custom domain (`.vercel.app` is fine for v1)
- Email notifications

---

## 6. The fitness formulas (THE CORE PRODUCT — get these right)

All math in the app must use these exact formulas. They were verified by hand-calculating an example before coding.

### BMR (Mifflin-St Jeor)
```
Men:   BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5
Women: BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161
```

### TDEE (activity-adjusted)
```
TDEE = BMR × activity multiplier
```

| Activity level | Multiplier |
|---|---|
| sedentary | 1.2 |
| light | 1.375 |
| moderate | 1.55 |
| very | 1.725 |
| extra | 1.9 |

### Calorie target (goal-adjusted)
- `lose` → TDEE − 500
- `muscle` → TDEE + 250
- `maintain` → TDEE

### Macros
- **Protein:** 1g per lb of body weight (convert kg to lbs: × 2.2)
- **Fat:** 25% of total calories ÷ 9 (since fat = 9 cal/g)
- **Carbs:** remaining calories ÷ 4 (since carbs = 4 cal/g)

### Verified test case
Input: Female, age 26, 65 kg, 165 cm, light activity, gain muscle
Expected output: BMR 1,390 | TDEE 1,912 | Calories 2,162 | Protein 143g | Fat 61g | Carbs 262g

**These numbers were hand-calculated and verified. If the app produces different numbers for this input, there is a bug.**

### Honest timeline messaging (DO NOT overpromise to users)
- Natural muscle gain caps at ~0.5–1 lb/month for intermediates
- Beginner "newbie gains" can be 1–2 lb/month for first 6–12 months
- Sustainable fat loss is ~1% body weight per week
- Be honest in any UI text about timelines. No "lose 30 lbs in 30 days" claims.

---

## 7. CURRENT BUG (active blocker)

**Error in browser console:**
```
Runtime ReferenceError
Can't find variable: handleSubmit
app/get-started/page.js (93:25)
```

**Diagnosis:**
There is an extra closing brace `}` somewhere in `app/get-started/page.js` that is closing the `GetStartedPage` function too early. As a result, `handleSubmit` is defined OUTSIDE the component and the JSX form on line 93 can't reach it.

**The structure must be:**
```javascript
export default function GetStartedPage() {
  const [formData, setFormData] = useState({ ... });
  const [results, setResults] = useState(null);

  function handleChange(e) { ... }
  function handleSubmit(e) { ... }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        ...
      </form>
    </main>
  );
}  ← only ONE closing brace at the very end
```

**Likely fix:** Find a lone `}` between the end of `handleSubmit` (after the `alert(...)` line) and the `return (` statement. Delete that line.

---

## 8. Coding conventions established

- **Auto-save is on** in VS Code (Settings → Auto Save)
- **No TypeScript** — keep all files as `.js`, not `.ts`
- **Tailwind utility classes** only — no `<style>` tags, no separate `.css` files (except `globals.css`)
- **Dark theme aesthetic:** `bg-gradient-to-br from-slate-900 to-slate-700`, white text, white CTAs with dark text
- **Components are colocated:** form lives in `app/get-started/page.js`, not split across files (yet)
- **Calculation functions** live at the **top of the file**, ABOVE the `export default function` component
- **State management:** `useState` only, no Redux/Zustand/context for v1
- **No client libraries** beyond what comes with Next.js + Tailwind unless absolutely needed
- **Use `"use client"`** at the top of any page that has interactivity (forms, useState, etc.)
- **Form pattern:** controlled inputs with `name`, `value`, `onChange` all wired to a single `formData` state object and one `handleChange` function

---

## 9. Roadmap (May 17 → May 31)

| Days | Phase | Outcome |
|---|---|---|
| ✅ May 11-16 | Phase 1: Foundation | Dev env, GitHub, Vercel, landing page live |
| 🟡 May 17-19 | Phase 2: Input form | Form built; currently fixing handleSubmit bug |
| ⏳ May 19-20 | Phase 3: Calculation logic | Math wired to form, results in `useState` |
| ⏳ May 21-22 | Phase 4: Results UI | Show numbers on screen, not in `alert()` |
| ⏳ May 23-25 | Phase 5: Workout plans | 3-5 templates, logic to assign one to user |
| ⏳ May 26-28 | Phase 6: Meal plans | Meal database + picker that hits macros |
| ⏳ May 29-31 | Phase 7: Polish + validate | Bug fixes, mobile testing, show 5-10 real users |

---

## 10. Working with this codebase — guidance for AI assistants

**When the user asks for code changes:**
1. **Read the relevant file(s) first.** Don't assume structure — verify.
2. **Make the minimum change required.** Don't refactor unrelated code.
3. **Preserve the existing styling.** Match the dark theme + Tailwind patterns.
4. **Keep things simple.** No advanced patterns (`useReducer`, custom hooks, context) unless requested.
5. **Don't add libraries** without confirming with the user.
6. **After changes, explain WHAT you changed and WHY**, not just diff output.
7. **Flag potential issues** the user might miss (unsaved files, missing imports, etc.).

**When the user is stuck:**
- Show them the simplest path first. Optimizations come later.
- If the user's idea has a problem, **say so directly** and explain the trade-off.
- Don't auto-validate ideas. Push back when needed.

**Don'ts:**
- Don't migrate to TypeScript
- Don't introduce a state management library (Redux, Zustand)
- Don't add a backend / API routes / database without asking — v1 is fully client-side
- Don't add authentication
- Don't suggest AI-generated plans for v1 — rule-based only
- Don't add testing frameworks for v1

---

## 11. Useful commands (for reference)

```bash
# Start local dev server
cd ~/Documents/peakform
npm run dev

# Save and deploy work
git add .
git commit -m "describe what you did"
git push        # Vercel auto-deploys ~60s later

# Open project in VS Code
cd ~/Documents/peakform
code .          # if installed; otherwise File → Open Recent in VS Code
```

---

## 12. Decision log (so we don't relitigate these)

- **Next.js + Tailwind + Vercel** chosen because: free, beginner-friendly, one language (JS), one deploy target, professional stack.
- **No TypeScript** because: TS adds friction for a beginner. Add later if project lives.
- **No Supabase yet** because: v1 is fully client-side. No data persistence needed for validation.
- **No payments** because: validation first. Stripe is a 2-week rabbit hole on its own.
- **No AI-generated plans** because: cost per user, unpredictable outputs, safety review needed.
- **`.vercel.app` URL is fine** because: custom domain costs ~$15/year and adds zero value during validation.
- **Hand-built workout templates** because: predictable, debuggable, no API costs.
- **`alert()` for testing** because: faster than wiring up DevTools console for a beginner.

---

**Last updated:** May 19, 2026 (mid-session, during Phase 2 → 3 transition)
**Current blocker:** handleSubmit ReferenceError (Section 7)
**Next action after fix:** Build results display UI to replace `alert()`
