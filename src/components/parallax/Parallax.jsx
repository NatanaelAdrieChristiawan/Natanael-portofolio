import { useRef } from "react";
import "./parallax.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const getParallaxConfig = (type) => {
  switch (type) {
    case "aboutMe":
      return {
        background: "linear-gradient(180deg, #111132, #0c0c1d)",
        title: "About Me?",
        image: "/planets.png",
      };
    case "portfolio":
      return {
        background: "linear-gradient(180deg, #111132, #505064)",
        title: "My Portfolio",
        image: "/sun.png",
      };
    case "clientReviews":
      return {
        background: "linear-gradient(180deg, #0c0c1d, #1a1a3e)",
        title: "Client Reviews",
        image: "/planets.png",
      };
    default:
      return {
        background: "linear-gradient(180deg, #111132, #0c0c1d)",
        title: "Section",
        image: "/planets.png",
      };
  }
};

const Parallax = ({ type }) => {
  const ref = useRef();
  const config = getParallaxConfig(type);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="parallax"
      ref={ref}
      style={{ background: config.background }}
    >
      <motion.h1 style={{ y: yText }}>{config.title}</motion.h1>
      <motion.div className="mountains"></motion.div>
      <motion.div
        className="planets"
        style={{
          y: yBg,
          backgroundImage: `url(${config.image})`,
        }}
      ></motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  );
};

export default Parallax;
