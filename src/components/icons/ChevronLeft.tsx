import type { SVGProps } from "react";
import React from "react";

type Variant = "fill" | "outline" | "none";

interface IconProps extends SVGProps<SVGSVGElement> {
  variant?: Variant;
}

const SvgChevronLeft: React.FC<IconProps> = ({ variant = "outline", ...props }) => {
  const commonProps =
    variant === "fill"
      ? { fill: "currentColor", stroke: "none" }
      : variant === "outline"
        ? { fill: "none", stroke: "currentColor", strokeWidth: 1.5 }
        : { fill: "none", stroke: "none" };

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M15 18L9.70711 12.7071C9.31658 12.3166 9.31658 11.6834 9.70711 11.2929L15 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...commonProps}
      />
    </svg>
  );
};

export default SvgChevronLeft;
