export type Product = {
  id: string;
  brand: string;
  description: string;
  priceO: number;
  priceR?: number;
  url: string;
  images: string[];
  sizes: string[];
};

export type SearchParams = {
  page: string;
  size: string;
  sortOrder: "asc" | "desc";
  minPrice: string;
  maxPrice: string;
};
