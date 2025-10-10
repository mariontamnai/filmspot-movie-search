import { useEffect, useRef } from "react";

export default function AutoScrollRow({ children }) {
  const rowRef = useRef();

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const speed = 1; // pixels per frame
    let animationFrame;

    const step = () => {
      if (row.scrollWidth - row.scrollLeft <= row.clientWidth) {
        row.scrollLeft = 0;
      } else {
        row.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={rowRef}
      className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
    >
      {children}
    </div>
  );
}
