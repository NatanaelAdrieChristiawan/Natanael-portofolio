import { useRef } from "react";
import "./aboutMe.scss";
import { motion } from "framer-motion";
import { FaLaravel, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiFlutter, SiTailwindcss, SiFirebase, SiVite, SiMysql } from "react-icons/si";
import { PiCertificateFill } from "react-icons/pi";

// Animation Variants
const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20,
        },
    },
};

const headerVariants = {
    initial: {
        opacity: 0,
        y: -20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 20,
        },
    },
};

// Tech Stack Data
const techStack = [
    { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
];

// Certifications Data
const certifications = [
    {
        id: 1,
        title: "Junior Web Developer",
        issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
        date: "2024 - 2027",
        accentClass: "cyan-glow",
        image: "/aboutMe/sertifikat/SertifikatBNSP.png",
    },
    {
        id: 2,
        title: "Praktek Kerja Lapangan (Internship)",
        issuer: "Sekolah Vokasi UGM",
        date: "Jul - Dec 2023",
        accentClass: "gold-glow",
        image: "/aboutMe/sertifikat/SertifikatPKL.png",
    },
];

const AboutMe = () => {
    const ref = useRef();

    return (
        <section id="about" className="aboutMe" ref={ref}>
            <div className="container">
                {/* Header Title */}
                <motion.div
                    className="headerTitle"
                    variants={headerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <span className="accent">Get to know</span>
                    <h2>About Me</h2>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    className="bentoGrid"
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Left Column - Bio Card */}
                    <motion.div className="bioCard card" variants={cardVariants}>
                        <div className="bioContent">
                            <div className="profileSection">
                                <motion.img
                                    src="/aboutMe/fotoProfil/FotoProfil.jpg"
                                    alt="Natanael Adrie Christiawan Profile"
                                    className="profileImage"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                            </div>
                            <div className="textSection">
                                <h3 className="headline">Natanael Adrie Christiawan</h3>
                                <p className="subHeadline">Informatics Student & Web | App Developer</p>
                                <div className="bodyText">
                                    <p>
                                        I am Natanael Adrie Christiawan, an Informatics student at Telkom University and a Software Engineering graduate from SMKN 2 Surakarta (2024). With a strong foundation in software development, I have practical experience building end-to-end digital solutions.
                                    </p>
                                    <p>
                                        During my 6-month internship at Universitas Gadjah Mada's Vocational College, I contributed to developing a campus asset management system. I am a BNSP-certified Junior Web Developer with technical expertise in building full-stack web applications using Laravel, React, and Next.js, as well as developing mobile applications with Flutter, integrated with Firebase and REST APIs.
                                    </p>
                                    <p>
                                        I am passionate about software engineering and committed to delivering high-quality, innovative technology solutions. Let's connect!
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Glow */}
                        <div className="decoration"></div>
                    </motion.div>

                    {/* Right Column Wrapper */}
                    <div className="rightColumn">
                        {/* Tech Stack Card */}
                        <motion.div className="techStackCard card" variants={cardVariants}>
                            <h4 className="cardTitle">Tech Stack</h4>
                            <div className="iconsGrid">
                                {techStack.map((tech) => (
                                    <motion.div
                                        key={tech.name}
                                        className="iconWrapper"
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        title={tech.name}
                                    >
                                        <tech.icon
                                            className="techIcon"
                                            style={{ "--brand-color": tech.color }}
                                        />
                                        <span className="iconLabel">{tech.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Certifications Card */}
                        <motion.div className="certificationsCard card" variants={cardVariants}>
                            <h4 className="cardTitle">Certifications</h4>
                            <div className="certList">
                                {certifications.map((cert) => (
                                    <motion.div
                                        key={cert.id}
                                        className={`certItem ${cert.accentClass}`}
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="certIcon">
                                            <PiCertificateFill />
                                        </div>
                                        <div className="certInfo">
                                            <h5 className="certTitle">{cert.title}</h5>
                                            <p className="certIssuer">{cert.issuer}</p>
                                            <span className="certDate">{cert.date}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
