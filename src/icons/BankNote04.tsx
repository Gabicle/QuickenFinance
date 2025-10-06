import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgBankNote04 = (
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
      d="M1 8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm8 .5a1 1 0 0 1 1 1v.28l.816.271a1 1 0 1 1-.632 1.898L12 10.554l-.5.167v.058l1.633.544a2 2 0 0 1 1.367 1.898v.058a2 2 0 0 1-1.367 1.898L13 15.22v.279a1 1 0 1 1-2 0v-.28l-.816-.271a1 1 0 0 1 .632-1.898l1.184.395.5-.167v-.058l-1.633-.544A2 2 0 0 1 9.5 10.779v-.058a2 2 0 0 1 1.367-1.898L11 8.78V8.5a1 1 0 0 1 1-1M6.5 10a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m11 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgBankNote04);
const Memo = memo(ForwardRef);
export default Memo;
