import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgBarChart14 = (
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
      strokeWidth={2}
      d="M15 21v-8H9v8m6 0H9m6 0h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2zm-6 0V10a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgBarChart14);
const Memo = memo(ForwardRef);
export default Memo;
