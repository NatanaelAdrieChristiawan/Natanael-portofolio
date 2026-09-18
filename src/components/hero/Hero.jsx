import { useState, useEffect } from "react";
import "./hero.scss";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import ParticleText from "../particleText/ParticleText";
import FloatingLines from "../floatingLines/FloatingLines";

const FLOATING_LINES_GRADIENT = ["#3b2d7a", "#0c0c1d", "#7c6aef"];
const FLOATING_LINES_WAVES = ["top", "middle", "bottom"];
const FLOATING_LINES_COUNT_DESKTOP = [8, 10, 14];
const FLOATING_LINES_COUNT_MOBILE = [5, 6, 8];
const FLOATING_LINES_DIST = [6, 5, 4];

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
         window.matchMedia("(hover: none)").matches ||
         window.innerWidth <= 768);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 250, damping: 25 });
  const scale = useSpring(1, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div className="hero">
      <div className="heroBackground">
        <FloatingLines
          linesGradient={FLOATING_LINES_GRADIENT}
          enabledWaves={FLOATING_LINES_WAVES}
          lineCount={isMobile ? FLOATING_LINES_COUNT_MOBILE : FLOATING_LINES_COUNT_DESKTOP}
          lineDistance={FLOATING_LINES_DIST}
          animationSpeed={isMobile ? 0.6 : 0.8}
          bendRadius={6}
          bendStrength={-0.4}
          interactive={!isMobile}
          parallax={!isMobile}
          parallaxStrength={0.15}
          mixBlendMode="screen"
          backgroundColor="#0c0c1d"
        />
      </div>
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>
            NATANAEL ADRIE CHRISTIAWAN
          </motion.h2>
          <motion.div variants={textVariants} className="particleTextWrapper">
            <ParticleText
              text={"Always Learning,\nAlways Growing"}
              particleSize={isMobile ? 1.8 : 2.4}
              density={isMobile ? 2 : 4.5}
              color="#f8f9ff"
              highlightColor="#c4b5fd"
              scatter={isMobile ? 70 : 160}
              gatherDuration={1100}
              stagger={isMobile ? 120 : 300}
              pointerRepel={isMobile ? 0 : 36}
              repelRadius={100}
              idleDrift={0}
              trigger="mount"
              fontSize={isMobile ? "clamp(1.75rem, 6.8vw, 34px)" : "clamp(2.2rem, 5.2vw, 76px)"}
              fontWeight={800}
              fontFamily="'DM Sans', sans-serif"
              textAlign="auto"
            />
          </motion.div>
          <motion.div variants={textVariants} className="buttons">
            <motion.button
              variants={textVariants}
              onClick={() => scrollToSection("Portfolio")}
            >
              See the latest Works
            </motion.button>
            <motion.button
              variants={textVariants}
              onClick={() => scrollToSection("Contact")}
            >
              Contact Me
            </motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
        <motion.div
          className="imageContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
          onMouseMove={isMobile ? undefined : handleMouseMove}
          onMouseEnter={isMobile ? undefined : handleMouseEnter}
          onMouseLeave={isMobile ? undefined : handleMouseLeave}
          style={{ perspective: isMobile ? "none" : 1000 }}
        >
          <motion.img
            src="/LogoNatan.png"
            alt="Natanael Adrie Logo"
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              scale: isMobile ? 1 : scale,
              transformStyle: isMobile ? "flat" : "preserve-3d",
              willChange: "transform",
              cursor: isMobile ? "default" : "pointer",
            }}
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Website and Application Developer
      </motion.div>
    </div>
  );
};

export default Hero;
