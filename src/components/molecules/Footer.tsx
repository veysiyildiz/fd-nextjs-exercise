import React from "react";
import { Logo, Text } from "@/components/atoms";
import { MenuItem } from ".";

const Footer: React.FC = () => (
  <footer className="flex justify-center bg-white fixed bottom-0 z-10 w-full p-4">
    <Text variant="span" className="text-gray-800 text-xs">
      &copy; 2024 Fashion Products
    </Text>
  </footer>
);

export default Footer;
