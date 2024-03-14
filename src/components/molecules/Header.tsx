import React from "react";
import { Logo } from "@/components/atoms";
import { MenuItem } from ".";

const Header: React.FC = () => (
  <header className="flex justify-between bg-white border-b fixed top-0 z-10 w-full px-6 py-3">
    <Logo />
    <nav className="flex space-x-4">
      <MenuItem href="/" label="Products" />
      <MenuItem href="/statistics" label="Statistics" />
    </nav>
  </header>
);

export default Header;
