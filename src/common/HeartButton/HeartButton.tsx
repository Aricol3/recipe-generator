import React from "react";
import './HeartButton.scss';

export default function HeartButton({
                                    isActive,
                                    onClick,
                                    animationTrigger = "click",
                                    animationScale = 1.05,
                                    animationDuration = 0.05,
                                    inactiveColor = "black",
                                    activeColor = "plum",
                                    className,
                                    style
                                  }) {

  return (
    <svg
      onClick={(e) => onClick(e)}
      viewBox="0 0 17 17"
      className={`heart-icon ${className}`}
      style={{
        fill: isActive ? activeColor : "transparent",
        stroke: isActive ? "transparent" : inactiveColor,
        strokeWidth: "1px",
        transitionDuration: `${animationDuration}s`,
        transform: `scale(${animationTrigger === 'active' ? animationScale : 1})`,
        ...style
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M8.5,2.3C12.9-2.2,24,5.7,8.5,16C-7,5.7,4.1-2.2,8.5,2.3z" />
    </svg>
  );
}
