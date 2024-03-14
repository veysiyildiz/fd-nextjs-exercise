"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Text, Price } from "@/components/atoms";
import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let discountPercentage;
  if (product.priceR && product.priceO > product.priceR) {
    discountPercentage = Math.round(
      ((product.priceO - product.priceR) / product.priceO) * 100
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center"
      aria-label={product.brand}
    >
      <div className="relative min-h-48">
        <Image
          src={product.images[0]}
          alt={product.brand}
          width={200}
          height={200}
          className={`w-auto transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
        <Image
          src={product.images[1]}
          alt={product.brand}
          width={200}
          height={200}
          className={`w-auto absolute top-0 left-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        {discountPercentage && (
          <div className="absolute left-0 bottom-0 m-2">
            <p className="px-1.5 py-0.5 text-xs md:text-sm inline-block rounded bg-red-600 text-white">
              {discountPercentage}%
            </p>
          </div>
        )}
      </div>
      <Text variant="span" className="text-gray-800 font-bold uppercase">
        {product.brand}
      </Text>
      {isHovered ? (
        <Text variant="span" className="text-gray-800 text-sm uppercase">
          {product.sizes.join(" ")}
        </Text>
      ) : (
        <Text variant="span" className="text-gray-800 text-center">
          {product.description}
        </Text>
      )}
      <Price priceO={product.priceO} priceR={product.priceR} />
    </div>
  );
};

export default ProductCard;
