import React from "react";
import { twMerge } from "tailwind-merge";

type TextProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  children: React.ReactNode | string | number | undefined;
};

const Text: React.FC<TextProps> = ({
  variant = "span",
  className,
  children,
}) => {
  const Component = variant;

  const baseStyle = "text-gray-800";
  const variantStyle = {
    h1: "text-2xl",
    h2: "text-xl",
    h3: "text-lg",
    h4: "text-base",
    h5: "text-sm",
    h6: "text-xs",
    p: "text-base",
    span: "text-base",
  }[variant];

  return (
    <Component className={twMerge(baseStyle, variantStyle, className)}>
      {children}
    </Component>
  );
};

export default Text;
