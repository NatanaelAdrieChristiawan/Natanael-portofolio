import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Serval Pest",
    img: "works/serval.png",
    desc: "Website responsive menggunakan react.js untuk Serval Integrated Pest Management di Malaysia, fokus pada lead generation dengan fitur Same Day Service, Pest Free Guarantee, dan Eco Friendly Treatment. Dilengkapi navigasi terpisah untuk layanan residential dan commercial/industrial dengan CTA yang jelas untuk konversi optimal.",
    link: "https://www.servalpestmanagement.com/"
  },
  {
    id: 2,
    title: "Tech News",
    img: "/Technews.png",
    desc: "Tech News NNK News merupakan website artikel tentang teknologi menggunakan Next.Js 14 dan menggunakan TailwindCss. Website ini berisi artikel-artikel yang bisa kita buat dengan melakukan login terlebih dahulu. Website ini sudah terintegrasi dengan login Google dan Github, serta bisa memilih gambar melalui library Cloudinary. Website ini menggunakan database MongoDB",
    link: "https://technews-natan-king.vercel.app/"
  },
  {
    id: 3,
    title: "KPH Yogyakarta",
    img: "/kphyogya.png",
    desc: "Website KPH Yogyakarta adalah Website yang berisi data-data yang berhubungan dengan kehutanan. Website ini menggunakan framework laravel dan database MySql. Website ini merupakan salah satu projek yang di kerjakan saat PKL di SV UGM",
    link: "https://kph.trpl.space/"
  },
  {
    id: 4,
    title: "Everrise Plastic",
    img: "works/everrise.png",
    desc: "Dfunds juga salah satu projek yang dikerjaka saat PKL di SV UGM. Website Dfunds merupakan web yang bertujuan untuk administrasi berbagai dokumen untuk berbagai keperluan. Website ini menggunakan framework Laravel dan database MySql",
    link: "https://evrplas.com/"
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
