import { forwardRef } from "react";
import type { ComponentType, SVGProps } from "react";
import styles from "./Icon.module.css";

export type Glyph = ComponentType<SVGProps<SVGSVGElement>>;
type Size = "sm" | "md" | "lg";
export type Color = "brand" | "danger" | "muted" | "inherit" | "white";

type IconProps = {
  glyph: Glyph;
  size?: Size;
  color?: Color;
  title?: string;
  decorative?: boolean;
  className?: string;
} & Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "color" | "children" | "aria-label"
>;

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    glyph: GlyphComp,
    size = "md",
    color = "inherit",
    title,
    decorative = true,
    className,
    ...rest
  },
  ref
) {
  if (!GlyphComp) {
    if (import.meta?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.error("Icon: `glyph` prop is undefined. Check your import/exports.");
    }
    return null;
  }

  const classes = [
    styles.icon,
    styles[size],
    styles[`icon-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const aria = decorative
    ? { "aria-hidden": true }
    : { role: "img" as const, "aria-label": title ?? "" };

  return (
    <GlyphComp
      ref={ref}
      className={classes}
      width="1em"
      height="1em"
      focusable={false}
      {...aria}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
    </GlyphComp>
  );
});

export default Icon;
