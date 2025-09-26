import type { SVGProps } from 'react';
import SvgPiggyBank01 from '../icons/PiggyBank01';
import s from './Logo.module.css';

type Variant = "fill" | "outline" | "none";

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: Variant;
}

export default function Logo({ variant = "fill", ...props }: LogoProps) {
  return (
    <div className={s.logo_container}>
      <SvgPiggyBank01 variant={variant} className={s.logo_color}{...props} />
    </div>
  )
}