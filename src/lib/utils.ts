import { Product } from "../types";
import { API_URL } from "./constants";

function getBrandWithMostProductsUnder40(products: Product[]) {
  const brands = products
    .filter(
      (product) => (product.priceR ? product.priceR : product.priceO) < 40
    )
    .map((product) => product.brand);

  const brandCounts: Record<string, number> = {};

  brands.forEach((brand) => {
    if (!brandCounts[brand]) {
      brandCounts[brand] = 0;
    }
    brandCounts[brand]++;
  });

  const sortedBrandCounts = Object.fromEntries(
    Object.entries(brandCounts).sort(([, a], [, b]) => b - a)
  );

  return sortedBrandCounts;
}

function getBrandWithLargestSizeSelection(products: Product[]) {
  const brandSizes = products.reduce(
    (acc: Record<string, string[]>, product) => {
      acc[product.brand] = Array.from(
        new Set([...(acc[product.brand] || []), ...product.sizes])
      );
      return acc;
    },
    {}
  );

  const brandSizeCounts: Record<string, number> = {};

  for (const brand in brandSizes) {
    brandSizeCounts[brand] = brandSizes[brand].length;
  }

  const sortedBrandSizeCounts = Object.fromEntries(
    Object.entries(brandSizeCounts).sort(([, a], [, b]) => b - a)
  );

  return sortedBrandSizeCounts;
}

function getBrandWithLowestAveragePriceForSize32(products: Product[]) {
  const size32Products = products.filter((product) =>
    product.sizes.includes("32")
  );
  const brandPrices = size32Products.reduce(
    (acc: Record<string, number[]>, product) => {
      acc[product.brand] = [
        ...(acc[product.brand] || []),
        product.priceR ? product.priceR : product.priceO,
      ];
      return acc;
    },
    {}
  );
  const brandAveragePrices = Object.keys(brandPrices).reduce(
    (acc: Record<string, number>, brand) => {
      acc[brand] =
        brandPrices[brand].reduce((a, b) => a + b) / brandPrices[brand].length;
      return acc;
    },
    {}
  );

  const sortedBrandAveragePrices = Object.fromEntries(
    Object.entries(brandAveragePrices).sort(([, a], [, b]) => a - b)
  );

  return sortedBrandAveragePrices;
}

function filterBySize(products: Product[], size: string): Product[] {
  const filteredProducts = products.filter((product) =>
    product.sizes.includes(size)
  );

  if (filteredProducts.length === 0) {
    return [];
  }

  return filteredProducts;
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

const fetchFromAPI = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`);
    const data = await response.json();
    return { status: "success", data };
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { status: "failed", error };
  }
};

export function getPriceRange(products: Product[]): {
  min: number;
  max: number;
} {
  let min = products[0]?.priceR || products[0]?.priceO || 0;
  let max = min;

  products.forEach((product) => {
    const price = product.priceR || product.priceO;
    if (price < min) min = price;
    if (price > max) max = price;
  });

  return { min, max };
}

export const getStatistics = (products: Product[]) => ({
  brandWithMostProductsUnder40: getBrandWithMostProductsUnder40(products),
  brandWithLargestSizeSelection: getBrandWithLargestSizeSelection(products),
  brandWithLowestAveragePriceForSize32:
    getBrandWithLowestAveragePriceForSize32(products),
});
export const fetchProducts = async (params: string) =>
  fetchFromAPI(`products?${params}`);
export const fetchStatistics = async () => fetchFromAPI("statistics");

export function categorizeSizes(products: Product[]): Record<string, string[]> {
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

export const processProducts = (
  products: Product[],
  minPrice: number,
  maxPrice: number,
  size: string,
  sortOrder: string
) => {
  let processedProducts = products;

  if (minPrice || maxPrice) {
    processedProducts = filterByPriceRange(
      processedProducts,
      minPrice,
      maxPrice,
      sortOrder
    );
  }

  if (size) {
    processedProducts = filterBySize(processedProducts, size);
  }

  return processedProducts;
};

export const paginateProducts = (
  products: Product[],
  page: number,
  pageSize: number
) => {
  const start = 0;
  const end = Number(page) * Number(pageSize);
  return products.slice(start, end);
};
