import React from "react";
import Link from "next/link";

const Logo: React.FC = () => (
  <span className="flex text-gray-800 text-lg font-bold">
    <Link href="/" aria-label="Home">
      FASHION PRODUCTS
    </Link>
  </span>
);

export default Logo;
