import React from "react";

const Pattern = () => {
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

export default Pattern;
