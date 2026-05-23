export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
};

const leatherFallbackImages = [
  "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?auto=format&fit=crop&w=1200&q=80",
];

const fallbackImageByProductName: Record<string, string> = {
  "atelier-tote":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
  "atelier-tote-32":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
  "heritage-handbag":
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80",
  "signature-wallet":
    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
};

const fallbackProductCopy: Record<
  string,
  { name: string; description: string; accent: string }
> = {
  "atelier-tote": {
    name: "아틀리에 토트",
    description: "차분한 실루엣과 실용적인 수납을 함께 담은 데일리 토트백입니다.",
    accent: "부드러운 토리옹 레더",
  },
  "atelier-tote-32": {
    name: "아틀리에 토트 32",
    description: "자연스럽게 흐르는 곡선과 넉넉한 수납을 겸비한 수제 토트백입니다.",
    accent: "부드러운 토리옹 레더",
  },
  "heritage-handbag": {
    name: "헤리티지 핸드백",
    description: "단정한 비율과 유려한 곡선이 돋보이는 수제 핸드백입니다.",
    accent: "매끈한 복스 카프",
  },
  "signature-wallet": {
    name: "시그니처 월렛",
    description: "손에 편안하게 감기고 가장자리 마감이 돋보이는 컴팩트 월렛입니다.",
    accent: "그레인 카프스킨",
  },
};

export const curatedLeatherFallbacks = Object.values(fallbackProductCopy);

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(price);

export const getProductImage = (product: Product, index: number): string => {
  if (!product.image_url || product.image_url.includes("example.com")) {
    const normalized = product.name.trim().toLowerCase().replace(/\s+/g, "-");
    const mappedImage = fallbackImageByProductName[normalized];

    if (mappedImage) {
      return mappedImage;
    }

    return leatherFallbackImages[index % leatherFallbackImages.length];
  }

  return product.image_url;
};

export const getProductAccent = (product: Product, index: number): string => {
  const fallback = curatedLeatherFallbacks[index % curatedLeatherFallbacks.length];
  return fallback.accent;
};

export const getProductDisplayName = (name: string): string => {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "-");
  return fallbackProductCopy[normalized]?.name ?? name;
};
