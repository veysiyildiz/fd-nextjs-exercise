"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { DEFAULT_PAGE, DEFAULT_SORT_ORDER } from "@/lib/constants";

type PriceRangeSliderProps = {
  min: number;
  max: number;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || DEFAULT_PAGE;
  const size = searchParams.get("size") || "";
  const sortOrder = searchParams.get("sortOrder") || DEFAULT_SORT_ORDER;
  const initialMinPrice = Number(searchParams.get("minPrice")) || min;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || max;

  const [value, setValue] = useState([initialMinPrice, initialMaxPrice]);

  useEffect(() => {
    const newMinPrice = Number(searchParams.get("minPrice")) || min;
    const newMaxPrice = Number(searchParams.get("maxPrice")) || max;
    setValue([newMinPrice, newMaxPrice]);
  }, [pathname, searchParams, max, min]);

  const updateURLParameters = (minPrice: number, maxPrice: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    newSearchParams.set("size", size.toString());
    newSearchParams.set("sortOrder", sortOrder);
    newSearchParams.set("minPrice", minPrice.toString());
    newSearchParams.set("maxPrice", maxPrice.toString());

    return newSearchParams.toString();
  };

  const handleChange = (newValue: number | number[]): void => {
    let newValueArray: number[];
    if (Array.isArray(newValue)) {
      newValueArray = newValue;
    } else {
      newValueArray = [newValue, newValue];
    }
    setValue(newValueArray);
    const newURLParameters = updateURLParameters(
      newValueArray[0],
      newValueArray[1]
    );
    router.push(`${pathname}?${newURLParameters}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="font-bold">{value[0]} €</span>
      <div className="flex-grow">
        <Slider
          range
          min={min}
          max={max}
          defaultValue={value}
          onAfterChange={handleChange}
        />
      </div>
      <span className="font-bold">{value[1]} €</span>
    </div>
  );
};

export default PriceRangeSlider;
