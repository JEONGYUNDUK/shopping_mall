export function HeroSection() {
  return (
    <section
      id="craft"
      className="mx-auto max-w-[1920px] px-6 pb-10 pt-10 sm:px-10 lg:px-14 lg:pb-14 lg:pt-14"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-6 text-[13px] text-stone-900">
          <button type="button" className="border-b border-black pb-1">
            모두보기
          </button>
          <button type="button" className="transition hover:opacity-60">
            토트백
          </button>
          <button type="button" className="transition hover:opacity-60">
            핸드백
          </button>
          <button type="button" className="transition hover:opacity-60">
            숄더백
          </button>
          <button type="button" className="transition hover:opacity-60">
            지갑
          </button>
        </div>

        <div className="space-y-8 pb-10 pt-2 lg:min-h-[280px]">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-black sm:text-6xl">
              수제 가죽 가방
            </h1>
            <p className="max-w-3xl text-[17px] leading-8 text-stone-700">
              고급스러운 소재와 절제된 실루엣, 오래 사용할수록 깊이가 더해지는
              디테일을 담은 가죽 제품을 소개합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
