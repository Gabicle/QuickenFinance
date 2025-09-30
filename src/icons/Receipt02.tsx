import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgReceipt02 = (
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
      fillRule="evenodd"
      d="M7 2h10c1.657 0 3 1.351 3 3.018v16.287a.5.5 0 0 1-.724.45l-2.829-1.423a1 1 0 0 0-.894 0l-3.106 1.562a1 1 0 0 1-.894 0l-3.106-1.562a1 1 0 0 0-.894 0l-2.83 1.423a.5.5 0 0 1-.723-.45V5.018A3.01 3.01 0 0 1 7 2m1 4a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgReceipt02);
const Memo = memo(ForwardRef);
export default Memo;
