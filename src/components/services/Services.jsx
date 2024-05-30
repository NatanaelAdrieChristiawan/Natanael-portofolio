import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {

  const ref = useRef()

  const isInView = useInView(ref, { margin: "-100px" })

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      // animate="animate"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          Saya merupakan lulusan SMKN 2 SURAKARTA <br /> Jurusan Pengembangan Perangkat Lunak dan Gim
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Perjalanan</motion.b> Pendidikan
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Menuju Karir</motion.b> Gemilang
          </h1>
          <button>PENGALAMAN SAYA</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Diklat Astra-Sinarmas UGM Tingkat Beginner</h2>
          <p>
            Membangun fondasi kuat dalam pengembangan website dan aplikasi Android dengan mempelajari HTML, CSS, JavaScript, dan Android Studio.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Diklat Astra-Sinarmas UGM Tingkat Intermediate</h2>
          <p>
            Meningkatkan kemampuan dengan mempelajari framework Laravel untuk website dan implementasi API pada aplikasi Android. 
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Diklat Astra-Sinarmas UGM Tingkat Advance</h2>
          <p>
            Mengembangkan keterampilan lanjutan dengan mempelajari Next.js untuk website dan implementasi Maps pada aplikasi Android. 
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Praktik Kerja Lapangan di Sekolah Vokasi UGM</h2>
          <p>
            Menerapkan ilmu yang didapat dengan menyelesaikan proyek nyata seperti aplikasi Android Biomastery, website Rumahepstopik.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
