import { forwardRef, useId } from "react";
import type { ComponentType, SVGProps } from "react";
import clsx from "clsx";
import styles from "./Icon.module.css";

export type Glyph = ComponentType<SVGProps<SVGSVGElement>>;
type Size = "xs" | "sm" | "md" | "lg";
export type Color = "brand" | "danger" | "muted" | "inherit" | "white";

type DecorativeProps = {
  decorative?: true;
  title?: never;
};
type NonDecorativeProps = {
  decorative: false;
  title: string;
};

type BaseProps = {
  glyph: Glyph;
  size?: Size;
  color?: Color;
  className?: string;
} & Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "color" | "children" | "aria-label"
>;

type IconProps = BaseProps & (DecorativeProps | NonDecorativeProps);

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    glyph: GlyphComp,
    size = "sm",
    color = "inherit",
    decorative = true,
    title,
    className,
    ...rest
  },
  ref
) {
  const rawId = useId();

  if (!GlyphComp) {
    console.error("Icon: `glyph` prop is undefined. Check your import/exports.");
    return null;
  }

  const classes = clsx(
    styles.icon,
    styles[size],
    styles[`icon-${color}`],
    className
  );

  const titleId = !decorative ? rawId : undefined;

  return (
    <GlyphComp
      ref={ref}
      className={classes}
      width="1em"
      height="1em"
      focusable={false}
      {...rest}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-labelledby": titleId })}
    >
      {!decorative ? <title id={titleId}>{title}</title> : null}
    </GlyphComp>
  );
});

export default Icon;
