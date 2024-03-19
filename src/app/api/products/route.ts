import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types";
import {
  JSON_DATA_URL,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from "@/lib/constants";
import {
  categorizeSizes,
  processProducts,
  paginateProducts,
  getPriceRange,
} from "@/lib/utils";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(JSON_DATA_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<Product[]>;
};

const getSearchParams = (url: string) => {
  const searchParams = new URLSearchParams(new URL(url).search);
  return {
    size: searchParams.get("size") || "",
    sortOrder: searchParams.get("sortOrder") || DEFAULT_SORT_ORDER,
    page: Number(searchParams.get("page") || DEFAULT_PAGE),
    minPrice: Number(searchParams.get("minPrice") || 0),
    maxPrice: Number(searchParams.get("maxPrice") || Infinity),
    pageSize: DEFAULT_PAGE_SIZE,
  };
};

export async function GET(request: NextRequest) {
  const { size, sortOrder, page, minPrice, maxPrice, pageSize } =
    getSearchParams(request.url);

  try {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let products: Product[] = await fetchProducts();

    const priceRange = getPriceRange(products);
    const categorizedSizes = categorizeSizes(products);

    products = processProducts(products, minPrice, maxPrice, size, sortOrder);
    const paginatedProducts = paginateProducts(products, page, pageSize);

    return NextResponse.json({
      total: products.length,
      products: paginatedProducts,
      sizes: categorizedSizes,
      priceRange,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
