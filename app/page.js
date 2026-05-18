export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white px-6">
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        peakform
      </h1>
      <p className="text-xl md:text-2xl text-slate-300 mb-8 text-center max-w-2xl">
        Achieve your dream physique with a personalized workout and meal plan built for your goals.
      </p>
      <a href="/get-started" className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-200 transition">
  Get Started
</a>
    </main>
  );
}