import React from "react";
import { ArrowDown01, ArrowDown10 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { SearchParams } from "@/types";
import { DEFAULT_PAGE, DEFAULT_SORT_ORDER } from "@/lib/constants";

type SortButtonsProps = {
  searchParams: SearchParams;
};

const SortButtons: React.FC<SortButtonsProps> = ({ searchParams }) => {
  const page = searchParams.page || DEFAULT_PAGE;
  const size = searchParams.size || "";
  const minPrice = searchParams.minPrice || "";
  const maxPrice = searchParams.maxPrice || "";
  const sortOrder = searchParams.sortOrder || DEFAULT_SORT_ORDER;

  return (
    <div className="flex items-center">
      <Link
        className={twMerge(
          `flex items-center text-gray-500 border-none mr-2 ${
            sortOrder === "asc" ? "text-blue-500" : "text-gray-500"
          }`
        )}
        href={`
              ?${new URLSearchParams({
                page,
                size,
                sortOrder: "asc",
                minPrice,
                maxPrice,
              }).toString()}
            `}
        scroll={false}
      >
        <ArrowDown01 />
      </Link>
      <Link
        className={twMerge(
          `flex items-center text-gray-500 border-none ${
            sortOrder === "desc" ? "text-blue-500" : "text-gray-500"
          }`
        )}
        href={`
              ?${new URLSearchParams({
                page,
                size,
                sortOrder: "desc",
                minPrice,
                maxPrice,
              }).toString()}
            `}
        scroll={false}
      >
        <ArrowDown10 />
      </Link>
    </div>
  );
};

export default SortButtons;
