import React from "react";

export const ClusterPattern = () => {
  // Wider trapezoid with optional rotation
  const Trapezoid = ({ x, y, flipped = false }) => (
    <g transform={`translate(${x}, ${y}) ${flipped ? "rotate(180 30 25)" : ""}`}>
      <path
        d={`
          M 5 0 
          H 55 
          Q 60 0 58 5 
          L 53 45 
          Q 52 50 47 50 
          H 13 
          Q 8 50 7 45 
          L 2 5 
          Q 0 0 5 0 
          Z
        `}
        fill="#006c35"
      />
    </g>
  );

  return (
    <svg width="400" height="350" viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg">
      {/* Row 1 - Diamonds (no radius) */}
      <g transform="translate(20, 20)">
        {[...Array(7)].map((_, i) => (
          <rect
            key={i}
            x={i * 50}
            y={0}
            width="25"
            height="25"
            transform={`rotate(45 ${i * 50 + 12.5} 12.5)`}
            fill="#006c35"
          />
        ))}
      </g>

      {/* Row 2 - Wider Trapezoids */}
      <g transform="translate(20, 80)">
        <Trapezoid x={14} y={0} />
        <Trapezoid x={94} y={0} flipped />
        <Trapezoid x={174} y={0} />
        <Trapezoid x={254} y={0} flipped />
      </g>

      {/* Row 3 - Diamonds (no radius) */}
      <g transform="translate(20, 150)">
        {[...Array(7)].map((_, i) => (
          <rect
            key={i}
            x={i * 50}
            y={0}
            width="25"
            height="25"
            transform={`rotate(45 ${i * 50 + 12.5} 12.5)`}
            fill="#006c35"
          />
        ))}
      </g>

      {/* Row 4 - Wider Trapezoids (flipped) */}
      <g transform="translate(20, 210)">
        <Trapezoid x={14} y={0} flipped />
        <Trapezoid x={94} y={0} />
        <Trapezoid x={174} y={0} flipped />
        <Trapezoid x={254} y={0} />  
      </g>

      {/* Row 5 - Diamonds (no radius) */}
      <g transform="translate(20, 280)">
        {[...Array(7)].map((_, i) => (
          <rect
            key={i}
            x={i * 50}
            y={0}
            width="25"
            height="25"
            transform={`rotate(45 ${i * 50 + 12.5} 12.5)`}
            fill="#006c35"
          />
        ))}
      </g>
    </svg>
  );
};

export const TetrisPattern =()=>{
  return (
    <div className="h-32 w-full bg-slate-900 relative">
      <svg
        className="absolute top-0 left-0 w-full h-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="tetris"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="10" height="10" fill="#0F172A" />
            <rect x="10" y="0" width="10" height="20" fill="#0F172A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tetris)" />
      </svg>
    </div>
  );
}

export function LargeSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="text-emerald-600"
        width="80" // ⬅️ make it large
        height="80"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          opacity=".2"
          strokeWidth="6"
        />
        <path
          d="M25 5a20 20 0 0 1 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

