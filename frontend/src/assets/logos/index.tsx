import { SVGProps } from "react";

export const NekroEdgeLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="backend-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8A2BE2" />
        <stop offset="100%" stopColor="#4A90E2" />
      </linearGradient>
      <linearGradient id="frontend-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#50E3C2" />
        <stop offset="100%" stopColor="#4A90E2" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Backend Hexagon */}
    <path d="M32 4L54 18V46L32 60L10 46V18L32 4Z" fill="url(#backend-grad)" filter="url(#shadow)" />
    {/* Frontend Arc */}
    <path
      d="M10 32 C 20 12, 44 12, 54 32"
      stroke="url(#frontend-grad)"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const DrizzleLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 75 72" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect
      width="5.25365"
      height="22.2834"
      rx="2.62683"
      transform="matrix(0.873028 0.48767 -0.497212 0.867629 16.0791 30.3292)"
      fill="#C5F74F"
    />
    <rect
      width="5.25365"
      height="22.2834"
      rx="2.62683"
      transform="matrix(0.873028 0.48767 -0.497212 0.867629 34.3301 19)"
      fill="#C5F74F"
    />
    <rect
      width="5.25365"
      height="22.2834"
      rx="2.62683"
      transform="matrix(0.873028 0.48767 -0.497212 0.867629 62.4131 19.0005)"
      fill="#C5F74F"
    />
    <rect
      width="5.25365"
      height="22.2834"
      rx="2.62683"
      transform="matrix(0.873028 0.48767 -0.497212 0.867629 44.1562 30.3292)"
      fill="#C5F74F"
    />
  </svg>
);

export const CloudflareLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-label="Cloudflare" role="img" viewBox="0 0 512 512" {...props}>
    <rect width="512" height="512" rx="15%" fill="#ffffff" />
    <path
      fill="#f38020"
      d="M331 326c11-26-4-38-19-38l-148-2c-4 0-4-6 1-7l150-2c17-1 37-15 43-33 0 0 10-21 9-24a97 97 0 0 0-187-11c-38-25-78 9-69 46-48 3-65 46-60 72 0 1 1 2 3 2h274c1 0 3-1 3-3z"
    />
    <path
      fill="#faae40"
      d="M381 224c-4 0-6-1-7 1l-5 21c-5 16 3 30 20 31l32 2c4 0 4 6-1 7l-33 1c-36 4-46 39-46 39 0 2 0 3 2 3h113l3-2a81 81 0 0 0-78-103"
    />
  </svg>
);

export const ReactLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const MuiLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 32" fill="none" {...props}>
    <path
      d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839z"
      fill="#007FFF"
    />
  </svg>
);
