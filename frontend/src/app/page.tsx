"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8000";

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(price);

const fallbackImage =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Fetch products from the FastAPI backend when the page loads.
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);

        if (!response.ok) {
          throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        const data: Product[] = await response.json();

        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "알 수 없는 오류가 발생했습니다.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f9fafb_0%,_#eef2ff_45%,_#ffffff_100%)] text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_55%)]" />

      <nav className="sticky top-0 z-20 border-b border-white/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-lg shadow-slate-900/20">
              SM
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Shopping Mall</p>
              <p className="text-xs text-slate-500">Everyday style, curated simply.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="장바구니"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386a1.5 1.5 0 0 1 1.458 1.146L5.7 6.75m0 0h13.278a1.5 1.5 0 0 1 1.474 1.778l-1.02 5.5a1.5 1.5 0 0 1-1.474 1.222H8.239a1.5 1.5 0 0 1-1.474-1.222L5.7 6.75Zm0 0L4.59 4.146M9.75 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm8.25 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              로그인
            </button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              New Season Essentials
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              매일 입고 싶은 아이템을 한눈에 살펴보세요.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              FastAPI와 Next.js로 연결된 실시간 상품 목록입니다. 깔끔한 쇼핑 경험을
              위해 핵심 정보만 선별해 보여줍니다.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Products
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-950">{products.length}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70 text-lg font-medium text-slate-500">
            로딩 중...
          </div>
        ) : error ? (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 px-6 py-10 text-center text-rose-700 shadow-sm">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
              >
                <div className="relative overflow-hidden bg-slate-100">
                  <img
                    src={product.image_url || fallbackImage}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                    재고 {product.stock}개
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                      {product.name}
                    </h2>
                    <p className="line-clamp-2 min-h-[3rem] text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Price
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-slate-950">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-600"
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
