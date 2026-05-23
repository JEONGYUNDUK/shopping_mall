import { LuxuryLink } from "@/components/ui/luxury-link";
import {
  Product,
  formatPrice,
  getProductAccent,
  getProductDisplayName,
  getProductImage,
} from "@/lib/products";

type ProductCardProps = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
  const imageUrl = getProductImage(product, index);
  const accent = getProductAccent(product, index);
  const displayName = getProductDisplayName(product.name);

  return (
    <article className="group bg-white">
      <div className="relative overflow-hidden border-r border-stone-200/60 bg-[#f7f6f2]">
        <button
          type="button"
          aria-label={`${displayName} 관심 상품`}
          className="absolute right-6 top-6 z-10 text-stone-700 opacity-0 transition duration-300 group-hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.5s-7-4.6-7-10.3c0-2.5 1.8-4.2 4.2-4.2 1.5 0 2.3.6 2.8 1.4.5-.8 1.3-1.4 2.8-1.4 2.4 0 4.2 1.7 4.2 4.2 0 5.7-7 10.3-7 10.3Z"
            />
          </svg>
        </button>
        <img
          src={imageUrl}
          alt={product.name}
          className="h-[420px] w-full object-contain px-8 py-10 transition duration-700 group-hover:scale-[1.02] sm:h-[500px] lg:h-[560px]"
        />
      </div>

      <div className="space-y-3 px-5 pb-7 pt-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-900">
          New Collection
        </p>
        <div className="space-y-2">
          <h3 className="text-[28px] font-normal leading-tight text-stone-900">
            {displayName}
          </h3>
          <p className="text-[15px] text-stone-600">{accent}</p>
          <p className="text-[15px] text-stone-600">{product.stock}개 한정 수량</p>
        </div>
        <p className="pt-2 text-[16px] text-stone-900">{formatPrice(product.price)}</p>
        <div className="pt-1">
          <LuxuryLink className="!gap-2 !text-[12px] !tracking-[0.08em]">
            부티크에서 찾기
          </LuxuryLink>
        </div>
      </div>
    </article>
  );
}
