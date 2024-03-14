import React from "react";

type PriceProps = {
  priceO: number;
  priceR?: number;
};

const Price: React.FC<PriceProps> = ({ priceO, priceR }) => {
  return (
    <div className="flex items-center space-x-2">
      {priceR ? (
        <>
          <span className="line-through text-gray-500">{priceO} €</span>
          <span className="text-red-500">{priceR} €</span>
        </>
      ) : (
        <span>{priceO} €</span>
      )}
    </div>
  );
};

export default Price;
