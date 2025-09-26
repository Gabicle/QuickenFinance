import type { ReactNode } from "react";
import s from "./Icon.module.css";

type Size = "sm" | "md" | "lg";

type IconProps = {
  children: ReactNode;
  size?: Size;
  className?: string;
};

export default function Icon({ children, size = "md", className }: IconProps) {
  return (
    <span className={`${s.icon} ${s[size]} ${className ?? ""}`}>
      {children}
    </span>
  );
}
