import React from "react";
import Link from "next/link";
import { Button, Text } from "@/components/atoms";

type MenuItemProps = {
  href: string;
  label: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ href, label }) => (
  <Link href={href} className="flex items-center space-x-2" aria-label={label}>
    <Text variant="span" className="menu-item-label">
      {label}
    </Text>
  </Link>
);

export default MenuItem;
