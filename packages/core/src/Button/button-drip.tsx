import React, { useEffect, useRef, useMemo } from "react";
import { StyledDrip, StyledDripG } from "./types";

interface Props {
  x: number;
  y: number;
  onCompleted: () => void;
  color: string;
}

const defaultProps = {
  x: 0,
  y: 0,
};

export type ButtonDrip = Props;

const dripStyle = {
  svg: {
    position: "absolute",
    animation: "350ms ease-in expand",
    animationFillMode: "forwards",
    width: "1rem",
    height: "1rem",
  },
};

const ButtonDrip: React.FC<ButtonDrip> = ({
  x,
  y,
  color,
  onCompleted,
}: ButtonDrip & typeof defaultProps) => {
  const dripRef = useRef<HTMLDivElement>(null);
  /* istanbul ignore next */
  const top = Number.isNaN(+y) ? 0 : y - 10;
  /* istanbul ignore next */
  const left = Number.isNaN(+x) ? 0 : x - 10;

  useEffect(() => {
    /* istanbul ignore next */
    if (!dripRef.current) return;
    dripRef.current.addEventListener("animationend", onCompleted);
    return () => {
      /* istanbul ignore next */
      if (!dripRef.current) return;
      dripRef.current.removeEventListener("animationend", onCompleted);
    };
  });

  const dripGColor = useMemo(() => {
    return {
      fill: color,
    };
  }, [color]);

  return (
    <StyledDrip ref={dripRef} className="drip" sx={dripStyle}>
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ top, left }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill={color}>
            <StyledDripG sx={dripGColor}>
              <rect width="100%" height="100%" rx="10" />
            </StyledDripG>
          </g>
        </g>
      </svg>
    </StyledDrip>
  );
};

ButtonDrip.defaultProps = defaultProps;
ButtonDrip.displayName = "GeistButtonDrip";
export default ButtonDrip;
