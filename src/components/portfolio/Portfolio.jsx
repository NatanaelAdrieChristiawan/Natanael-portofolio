import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Serval Pest",
    img: "works/serval.png",
    desc: "A responsive lead-generation website built with React.js for Serval Integrated Pest Management in Malaysia. Features dedicated navigation for residential and commercial/industrial services, highlighting Same Day Service, Pest Free Guarantee, and Eco-Friendly Treatments with clear CTAs optimized for high conversion.",
    link: "https://www.servalpestmanagement.com/"
  },
  {
    id: 2,
    title: "Mari Renov",
    img: "works/MariRenov.png",
    desc: "A high-converting landing page for a premium interior home renovation and construction service. Designed with an elegant, responsive, and informative UI/UX to maximize customer consultation leads. Developed using React.js and Tailwind CSS.",
    link: "https://www.marirenov.com"
  },
  {
    id: 3,
    title: "Everrise Plastic",
    img: "works/everrise.png",
    desc: "An e-commerce platform developed for Everrise Plastic, a leading plastic distributor in Indonesia. Engineered with a strong focus on seamless user experience and effortless transaction flows, powered by Laravel and MySQL.",
    link: "https://evrplas.com/"
  },
  {
    id: 4,
    title: "Ataka Technology",
    img: "works/AtakaTechnology.png",
    desc: "Interactive company profile landing page for Ataka Technology Indonesia, an IT & technology enterprise. Equipped with an intuitive Content Management System (CMS) enabling effortless, independent content management for administrators. Built using Laravel, Filament CMS, and Tailwind CSS.",
    link: "https://ataka.co.id/"
  },
  {
    id: 5,
    title: "Ataka Sarana Indonesia",
    img: "works/AtakaSarana.png",
    desc: "Premium company profile landing page for Ataka Sarana Indonesia, a manufacturing & engineering corporation. Features smooth GSAP animations and dynamic micro-interactions reflecting corporate excellence, paired with an intuitive CMS. Developed with Laravel, Filament, Tailwind CSS, Alpine.js, and GSAP.",
    link: "https://atakasarana.id/"
  },
];

const Single = ({ item }) => {
  const ref = useRef()

  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["end end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <button>Visit</button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })
  
  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>My Portfolio</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
