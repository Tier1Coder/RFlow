import React from "react";
import { Textfit } from "react-textfit";

interface NoneEndEventIconProps {
  name?: string;
}

const NoneEndEventIcon: React.FC<NoneEndEventIconProps> = ({ name }) => (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        color: "currentColor",
      }}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="14%"
        d="M256 472c119.103 0 216-96.897 216-216S375.103 40 256 40 40 136.897 40 256s96.897 216 216 216Z"
      />
    </svg>

    {name && (
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "currentColor",
          width: "100%",
          textAlign: "center",
          fontFamily: "inherit",
          lineHeight: 1.2,
        }}
      >
        <Textfit>
          {name}
        </Textfit>
      </div>
    )}
  </div>
);

export default NoneEndEventIcon;