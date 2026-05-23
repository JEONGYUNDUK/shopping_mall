"use client";

import { useEffect, useState } from "react";

import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/lib/products";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8000";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

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
    <main className="min-h-screen bg-white text-stone-900">
      <SiteHeader />
      <HeroSection />

      <section
        id="collection"
        className="mx-auto max-w-[1920px] px-0 pb-20"
      >
        <div className="px-6 pb-8 sm:px-10 lg:px-14">
          <h2 className="text-[28px] font-medium tracking-tight text-black sm:text-[34px]">
            수제 가죽 가방 컬렉션 ({products.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="grid gap-y-0 md:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse border-t border-stone-200/60 bg-white"
              >
                <div className="h-[420px] bg-[#f7f6f2] sm:h-[500px] lg:h-[560px]" />
                <div className="space-y-3 px-5 pb-7 pt-6">
                  <div className="h-4 w-28 bg-stone-200" />
                  <div className="h-8 w-40 bg-stone-200" />
                  <div className="h-4 w-32 bg-stone-200" />
                  <div className="h-4 w-28 bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mx-6 border border-stone-200 bg-white px-8 py-12 text-center sm:mx-10 lg:mx-14">
            <p className="text-[12px] text-stone-500">
              컬렉션을 불러올 수 없습니다
            </p>
            <p className="mt-4 text-2xl text-stone-900">{error}</p>
          </div>
        ) : (
          <div
            id="objects"
            className="grid gap-y-0 border-t border-stone-200/60 md:grid-cols-2 xl:grid-cols-4"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
