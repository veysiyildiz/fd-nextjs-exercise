import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types";
import {
  JSON_DATA_URL,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from "@/lib/constants";

function filterBySize(products: Product[], size: string): Product[] {
  const filteredProducts = products.filter((product) =>
    product.sizes.includes(size)
  );

  if (filteredProducts.length === 0) {
    return [];
  }

  return filteredProducts;
}

function getPriceRange(products: Product[]): { min: number; max: number } {
  let min = products[0]?.priceR || products[0]?.priceO || 0;
  let max = min;

  products.forEach((product) => {
    const price = product.priceR || product.priceO;
    if (price < min) min = price;
    if (price > max) max = price;
  });

  return { min, max };
}

function filterByPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number,
  sortOrder: string
): Product[] {
  return products
    .filter((product) => {
      const price = product.priceR || product.priceO;
      return price >= minPrice && price <= maxPrice;
    })
    .sort((a, b) => {
      const priceA = a.priceR || a.priceO;
      const priceB = b.priceR || b.priceO;

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else if (sortOrder === "desc") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });
}

function categorizeSizes(products: Product[]): Record<string, string[]> {
  const sizeCategories: Record<string, string[]> = {
    Standard: [],
    Numeric: [],
  };

  const standardSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "4XL",
    "5XL",
    "00",
  ];

  products.forEach((product) => {
    const hasAlphabeticSize = product.sizes.some((size) => isNaN(Number(size)));
    const category = hasAlphabeticSize ? "Standard" : "Numeric";

    product.sizes.forEach((size) => {
      if (!sizeCategories[category].includes(size)) {
        sizeCategories[category].push(size);
      }
    });
  });

  sizeCategories["Standard"].sort(
    (a, b) => standardSizes.indexOf(a) - standardSizes.indexOf(b)
  );

  sizeCategories["Numeric"].sort((a, b) => Number(a) - Number(b));

  return sizeCategories;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const size = searchParams.get("size") || "";
  const sortOrder = searchParams.get("sortOrder") || DEFAULT_SORT_ORDER;
  const page = Number(searchParams.get("page") || DEFAULT_PAGE);
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || Infinity);
  const pageSize = DEFAULT_PAGE_SIZE;

  try {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const response = await fetch(JSON_DATA_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    let products: Product[] = await response.json();

    const priceRange = getPriceRange(products);
    const categorizedSizes = categorizeSizes(products);

    if (minPrice || maxPrice) {
      products = filterByPriceRange(products, minPrice, maxPrice, sortOrder);
    }

    if (size) {
      products = filterBySize(products, size);
    }

    const start = 0;
    const end = Number(page) * Number(pageSize);
    const paginatedProducts = products.slice(start, end);

    return NextResponse.json({
      total: products.length,
      products: paginatedProducts,
      sizes: categorizedSizes,
      priceRange,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}
