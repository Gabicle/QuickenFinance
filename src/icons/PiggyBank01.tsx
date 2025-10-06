import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgPiggyBank01 = (
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
      d="M7.065 6.827c-.033.168.122.304.29.274Q7.914 7 8.5 7h3.987c.308 0 .596-.144.797-.377q.102-.12.21-.235a.48.48 0 0 0 .089-.547 3.5 3.5 0 0 0-6.518.986"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M20 11.436a1 1 0 0 1 1 1v2.128a1 1 0 0 1-1 1h-.5a4.5 4.5 0 0 1-2.615 2.219.54.54 0 0 0-.385.505V19.5a.5.5 0 0 1-.5.5h-2.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-.5.5H7.5a.5.5 0 0 1-.5-.5v-1.402a.54.54 0 0 0-.328-.485A4.5 4.5 0 0 1 8.5 9h5.232a.51.51 0 0 0 .418-.222c.895-1.294 1.81-2.169 3.1-2.268a.235.235 0 0 1 .25.24v2.408c0 .19.109.361.273.457a4.5 4.5 0 0 1 1.578 1.556c.097.16.266.265.453.265zM16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M4.832 5.445a1 1 0 0 1-.277 1.387c-.38.253-.634.836-.532 1.41q.02.112.06.226a.3.3 0 0 1-.063.322c-.366.349-.692.74-.97 1.165-.09.14-.29.163-.391.03a3.2 3.2 0 0 1-.606-1.393c-.223-1.26.272-2.677 1.392-3.424a1 1 0 0 1 1.387.277"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgPiggyBank01);
const Memo = memo(ForwardRef);
export default Memo;
