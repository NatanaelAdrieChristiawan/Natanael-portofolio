import Sidebar from "../sidebar/Sidebar"
import "./navbar.scss"
import { motion } from "framer-motion"

const socialLinks = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/natanael_prakosa",
    icon: "/instagram.png",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/NatanaelAdrieChristiawan",
    icon: "/github2.png",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/natanael-adrie-christiawan/",
    icon: "/linkedin.png",
  },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: -10, scale: 0.85 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 22,
    },
  },
};

const Navbar = () => {
  return (
    <div className="navbar">
      {/* {sidebar} */}
      <Sidebar />
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Natan Dev
        </motion.span>
        <motion.div
          className="social"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {socialLinks.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`socialItem ${item.id}`}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.12 }}
              whileTap={{ scale: 0.92, y: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              aria-label={item.name}
            >
              <img src={item.icon} alt={item.name} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar