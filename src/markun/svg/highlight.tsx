import React from 'react';

export default function highlight() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="48"
        height="48"
        fill="white"
        fillOpacity="0.01"
      ></rect>
      <path
        d="M6 44L6 25H12V17H36V25H42V44H6Z"
        fill="none"
        stroke="#333"
        strokeWidth="4"
        strokeLinejoin="round"
      ></path>
      <path
        d="M17 17V8L31 4V17"
        stroke="#333"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
