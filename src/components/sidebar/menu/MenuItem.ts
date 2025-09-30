import type { Color, Glyph } from "../../icon/Icon";



export type MenuItem = {
  to: string;
  label: string;
  icon: Glyph;
 iconColor?: Color;
}