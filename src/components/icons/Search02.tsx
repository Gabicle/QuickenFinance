import type { SVGProps } from "react";
import React from "react";

type Variant = "fill" | "outline" | "none";

interface IconProps extends SVGProps<SVGSVGElement> {
  variant?: Variant;
}

const SvgSearch02: React.FC<IconProps> = ({ variant = "fill", ...props }) => {
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
        d="M16.6569 16.6569C19.781 13.5327 19.781 8.46734 16.6569 5.34315C13.5327 2.21895 8.46734 2.21895 5.34315 5.34315C2.21895 8.46734 2.21895 13.5327 5.34315 16.6569C8.46734 19.781 13.5327 19.781 16.6569 16.6569Z"
        {...commonProps}
      />
      <path
        d="M18.9385 17.5242C18.8339 17.4197 18.6622 17.4284 18.5654 17.5401C18.4082 17.7216 18.2435 17.8987 18.0711 18.0711C17.8987 18.2435 17.7216 18.4082 17.5401 18.5654C17.4284 18.6622 17.4197 18.8339 17.5242 18.9385L19.2927 20.707C19.6833 21.0975 20.3164 21.0975 20.707 20.707C21.0975 20.3164 21.0975 19.6833 20.707 19.2927L18.9385 17.5242Z"
        {...commonProps}
      />
    </svg>
  );
};

export default SvgSearch02;
