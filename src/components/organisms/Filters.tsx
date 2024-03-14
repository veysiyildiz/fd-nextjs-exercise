"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Modal from "react-modal";
import { X, SlidersHorizontal } from "lucide-react";
import { Button, SortButtons } from "@/components/atoms";
import { PriceRangeSlider, SizeSelector } from "@/components/molecules";
import { DEFAULT_PAGE, DEFAULT_SORT_ORDER } from "@/lib/constants";
import { SearchParams } from "@/types";

type FilterProps = {
  sizes?: Record<string, string[]>;
  priceRange?: { min: number; max: number };
  searchParams?: SearchParams;
};

const Filters: React.FC<FilterProps> = ({
  sizes,
  priceRange,
  searchParams,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const page = searchParams?.page || DEFAULT_PAGE;
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const sortOrder = searchParams?.sortOrder || DEFAULT_SORT_ORDER;
  const currentSize = searchParams?.size || "";

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const updateURLParameters = () => {
    const newSearchParams = new URLSearchParams("");

    return newSearchParams.toString();
  };

  const clearFilters = () => {
    const newURLParameters = updateURLParameters();
    router.push(`${pathname}?${newURLParameters}`);
    closeModal();
  };

  return (
    <div>
      <Button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        <SlidersHorizontal />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Size Selector"
        overlayClassName="fixed inset-0 bg-white z-20 bg-opacity-75"
        className="absolute sm:inset-10 border border-gray-400 bg-white overflow-auto rounded outline-none sm:p-5 p-4 z-30 sm:w-96 w-full h-full mx-auto"
        ariaHideApp={false}
      >
        <Button
          onClick={closeModal}
          className="absolute top-4 right-2 text-gray-500 hover:text-gray-700 transition-colors border-none"
        >
          <X />
        </Button>
        <Button
          onClick={clearFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Clear Filters
        </Button>
        <div className="flex flex-row justify-between items-center mt-10 mb-4">
          <label className="font-bold text-lg">Sort by Price</label>
          {searchParams && <SortButtons searchParams={searchParams} />}
        </div>
        <div className="flex flex-col space-y-4">
          {priceRange && (
            <PriceRangeSlider min={priceRange.min} max={priceRange.max} />
          )}
          <label className="font-bold text-lg mb-2">Sort by Size</label>
          {searchParams && sizes && (
            <SizeSelector searchParams={searchParams} sizes={sizes} />
          )}{" "}
        </div>
      </Modal>
    </div>
  );
};

export default Filters;
