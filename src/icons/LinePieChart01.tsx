import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgLinePieChart01 = (
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
      d="M8 3.936A9 9 0 1 0 20.064 16M12 11V4c0-.552.45-1.006.998-.945a9.004 9.004 0 0 1 7.947 7.947c.06.549-.393.998-.945.998h-7a1 1 0 0 1-1-1"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgLinePieChart01);
const Memo = memo(ForwardRef);
export default Memo;
