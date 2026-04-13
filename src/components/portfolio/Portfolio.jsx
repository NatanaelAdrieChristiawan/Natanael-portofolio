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
    title: "Mari Renov",
    img: "works/MariRenov.png",
    desc: "Website jasa konstruksi interior dengan fokus pada UI/UX premium dan konversi tinggi. Projek ini merupakan pengembangan landing page untuk layanan renovasi rumah premium. Fokus utama proyek ini adalah menghadirkan desain yang elegan, responsif, dan informatif untuk meningkatkan konversi konsultasi pelanggan. Projek ini menggunakan Tech Stack React.js, dan Tailwind.css",
    link: "https://www.marirenov.com"
  },
  {
    id: 3,
    title: "Everrise Plastic",
    img: "works/everrise.png",
    desc: "Website e-commerce untuk Everrise Plastic, distributor plastik terkemuka di Indonesia. Projek ini merupakan pengembangan platform e-commerce dengan fokus pada user experience dan kemudahan transaksi. Website ini menggunakan framework Laravel dan database MySql",
    link: "https://evrplas.com/"
  },
  {
    id: 4,
    title: "Ataka Technology",
    img: "works/AtakaTechnology.png",
    desc: "Projek Landing Page Ataka Technology Indonesia – Perusahaan Teknologi & IT. Projek ini merupakan pengembangan website company profile interaktif yang telah dilengkapi dengan sistem Content Management System (CMS). Fokus utama proyek ini adalah menghadirkan desain yang modern dan dinamis, sekaligus memudahkan admin/klien dalam mengelola konten website secara mandiri. Projek ini menggunakan Tech Stack Laravel, Filament, dan Tailwind CSS.",
    link: "https://ataka.co.id/"
  },
  {
    id: 5,
    title: "Ataka Sarana Indonesia",
    img: "works/AtakaSarana.png",
    desc: "Projek Landing Page Ataka Sarana Indonesia – Perusahaan Industri Manufaktur & Engineering. Projek ini merupakan pengembangan website company profile interaktif yang telah dilengkapi dengan sistem Content Management System (CMS). Fokus utama proyek ini adalah menghadirkan desain premium dengan animasi yang dinamis untuk merepresentasikan profesionalisme perusahaan, sekaligus memudahkan admin/klien dalam mengelola konten website secara mandiri. Projek ini menggunakan Tech Stack Laravel, Filament, Tailwind CSS, Alpine.js, dan GSAP.",
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
