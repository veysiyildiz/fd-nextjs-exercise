import React from "react";
import { twMerge } from "tailwind-merge";
import { SearchParams } from "@/types";
import { DEFAULT_PAGE, DEFAULT_SORT_ORDER } from "@/lib/constants";
import Link from "next/link";

type SizeSelectorProps = {
  searchParams: SearchParams;
  sizes: Record<string, string[]>;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ searchParams, sizes }) => {
  const page = searchParams.page || DEFAULT_PAGE;
  const minPrice = searchParams.minPrice || "";
  const maxPrice = searchParams.maxPrice || "";
  const sortOrder = searchParams.sortOrder || DEFAULT_SORT_ORDER;
  const currentSize = searchParams.size || "";

  return (
    <div className="flex flex-col space-y-4">
      {Object.entries(sizes).map(([category, sizes]) => (
        <div key={category} className="flex flex-col space-y-2">
          <h3 className="text-sm font-bold">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Link
                key={size}
                href={`
                ?${new URLSearchParams({
                  page,
                  size,
                  sortOrder,
                  minPrice,
                  maxPrice,
                }).toString()}
                `}
                className={twMerge(
                  `flex items-center justify-center text-xs border-2 rounded-md px-2 py-1 ${
                    currentSize === size
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-500 text-gray-500"
                  }`
                )}
              >
                {size}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SizeSelector;
