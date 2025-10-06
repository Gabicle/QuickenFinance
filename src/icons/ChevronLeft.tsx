import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgChevronLeft = (
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
      d="m15 18-5.293-5.293a1 1 0 0 1 0-1.414L15 6"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgChevronLeft);
const Memo = memo(ForwardRef);
export default Memo;
