import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types";
import { JSON_DATA_URL } from "@/lib/constants";
import { getStatistics } from "@/lib/utils";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(JSON_DATA_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<Product[]>;
};

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  let products: Product[] = await fetchProducts();

  const statistics = getStatistics(products);

  return NextResponse.json(statistics);
}
