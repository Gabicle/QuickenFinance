import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgHeadphone01 = (
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
      d="M5 11v-1a7 7 0 0 1 14 0v1M5 11h1.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2m14 0h-1.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5m1-6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1m0 0c0 2-2 3-4 3m0 0v-.5a.5.5 0 0 0-.5-.5H12a1 1 0 1 0 0 2h1.5a.5.5 0 0 0 .5-.5z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgHeadphone01);
const Memo = memo(ForwardRef);
export default Memo;
