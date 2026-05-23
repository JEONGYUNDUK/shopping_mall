import { LuxuryLink } from "@/components/ui/luxury-link";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-3 text-[11px] font-light tracking-[0.18em] sm:px-10 lg:px-14">
          <div className="flex items-center gap-6">
            <a href="#" className="transition hover:opacity-80">
              전화 문의하기
            </a>
            <a href="#" className="transition hover:opacity-80">
              부티크
            </a>
          </div>
          <p className="hidden sm:block">무료 배송 &amp; 무료 반품</p>
          <p>KR / KO</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-8 sm:px-10 lg:px-14">
        <div className="flex items-center gap-10 xl:gap-14">
          <a href="#" className="font-serif text-[3rem] leading-none text-black">
            Maison Cuir
          </a>
          <nav className="hidden items-center gap-8 xl:flex">
            <a href="#collection" className="text-[13px] text-stone-900 transition hover:opacity-60">
              여성
            </a>
            <a href="#collection" className="text-[13px] text-stone-900 transition hover:opacity-60">
              남성
            </a>
            <a href="#collection" className="text-[13px] text-stone-900 transition hover:opacity-60">
              시그니처 스타일
            </a>
            <a href="#collection" className="text-[13px] text-stone-900 transition hover:opacity-60">
              가죽 소품
            </a>
            <a href="#collection" className="text-[13px] text-stone-900 transition hover:opacity-60">
              신상품
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            aria-label="검색"
            className="text-stone-600 transition hover:text-[#F37021]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="계정"
            className="text-stone-600 transition hover:text-[#F37021]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="h-5 w-5"
            >
              <circle cx="12" cy="8" r="3.2" />
              <path strokeLinecap="round" d="M5.5 19.5c1.5-3.2 4-4.8 6.5-4.8s5 1.6 6.5 4.8" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="장바구니"
            className="text-stone-600 transition hover:text-[#F37021]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7V6a5 5 0 0 1 10 0v1" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 7.5h13l-.8 10.5a1 1 0 0 1-1 .9H7.3a1 1 0 0 1-1-.9L5.5 7.5Z" />
            </svg>
          </button>
          <LuxuryLink className="hidden xl:inline-flex">로그인</LuxuryLink>
        </div>
      </div>
    </header>
  );
}
