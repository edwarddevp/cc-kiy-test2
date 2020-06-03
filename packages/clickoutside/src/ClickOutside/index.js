import React, { useRef, useEffect } from "react";

export const ClickOutside = ({ handleAction, children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      handleAction();
    }
  };

  return <div ref={wrapperRef}>{children}</div>;
};
