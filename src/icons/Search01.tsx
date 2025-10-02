import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgSearch01 = (
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
      fill="currentColor"
      d="M15.803 15.803A7.5 7.5 0 1 0 5.197 5.197a7.5 7.5 0 0 0 10.606 10.606m2.281.867a.256.256 0 0 0-.374.017 9.6 9.6 0 0 1-1.023 1.023.256.256 0 0 0-.017.374l2.623 2.623a1 1 0 0 0 1.414-1.414z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgSearch01);
const Memo = memo(ForwardRef);
export default Memo;
