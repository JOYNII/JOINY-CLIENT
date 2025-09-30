export default function ThemePage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <header className="mb-12 md:mb-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 leading-none">
          Theme
        </h1>
        <p className="mt-2 text-xl md:text-2xl text-gray-500 font-light">
          다양한 테마의 파티를 탐색해보세요.
        </p>
      </header>

      <section>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-72 h-56 bg-red-500 rounded-xl shadow-lg flex items-center justify-center text-white text-3xl font-bold cursor-pointer transform hover:scale-105 transition-transform">
            크리스마스
          </div>
          <div className="w-72 h-56 bg-sky-500 rounded-xl shadow-lg flex items-center justify-center text-white text-3xl font-bold cursor-pointer transform hover:scale-105 transition-transform">
            동창회
          </div>
        </div>
      </section>
    </div>
  );
}
