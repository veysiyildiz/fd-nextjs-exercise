import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types";
import { JSON_DATA_URL } from "@/lib/constants";

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

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const response = await fetch(JSON_DATA_URL);
  let products: Product[] = await response.json();

  const statistics = {
    brandWithMostProductsUnder40: getBrandWithMostProductsUnder40(products),
    brandWithLargestSizeSelection: getBrandWithLargestSizeSelection(products),
    brandWithLowestAveragePriceForSize32:
      getBrandWithLowestAveragePriceForSize32(products),
  };

  const nextResponse = NextResponse.json(statistics);

  // Set CORS headers
  nextResponse.headers.set("Access-Control-Allow-Origin", "*");
  nextResponse.headers.set("Access-Control-Allow-Methods", "GET");
  nextResponse.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return nextResponse;
}
