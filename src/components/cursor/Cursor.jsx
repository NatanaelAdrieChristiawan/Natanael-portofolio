import { useEffect, useState } from "react";
import "./cursor.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  // Start off-screen to avoid top-left flicker before mouse movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-performance spring configuration for butter-smooth tracking with zero re-renders
  const springConfig = { damping: 28, stiffness: 350, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable cursor on fine pointer devices (desktop with mouse)
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(pointer: coarse)").matches &&
      window.innerWidth > 768;

    setIsEnabled(isFinePointer);

    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      // Offset by 25px so the 50px circle centers on the pointer tip
      mouseX.set(e.clientX - 25);
      mouseY.set(e.clientY - 25);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Completely unmount cursor on mobile / touch devices
  if (!isEnabled) return null;

  return (
    <motion.div
      className="cursor"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
};

export default Cursor;
