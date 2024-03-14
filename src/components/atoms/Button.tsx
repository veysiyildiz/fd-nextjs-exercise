import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | null;
  ariaLabel?: string;
  href?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant,
  type = "button",
  ariaLabel,
  href,
  disabled = false,
}) => {
  let buttonClass = "";
  const defaultAriaLabel = typeof children === "string" ? children : "Button";
  const disabledClass = disabled ? "opacity-20 cursor-not-allowed" : "";

  switch (variant) {
    case "primary":
      buttonClass = "bg-blue-500 text-white";
      break;
    case "secondary":
      buttonClass = "bg-gray-500 text-white";
      break;
    default:
      buttonClass = "bg-transparent border text-black";
  }

  const button = (
    <button
      onClick={onClick}
      type={type}
      className={twMerge(
        "py-2 px-4 rounded",
        buttonClass,
        className,
        disabledClass
      )}
      aria-label={ariaLabel || defaultAriaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return href ? (
    <Link href={href}>
      <button
        className={`py-2 px-4 ${className}`}
        aria-label={ariaLabel || defaultAriaLabel}
      >
        {children}
      </button>
    </Link>
  ) : (
    button
  );
};

export default Button;
