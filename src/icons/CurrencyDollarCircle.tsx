import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgCurrencyDollarCircle = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.5 0-2.5 1-2.5 2 0 1.5 1 2 2.5 2s2.5.5 2.5 2c0 1-1 2-2.5 2m0-8c1.5 0 2.5 1 2.5 1.833M12 8V6.5m0 9.5c-1.5 0-2.333-1-2.333-1.833M12 16v1.5m0 4.5C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCurrencyDollarCircle);
const Memo = memo(ForwardRef);
export default Memo;
