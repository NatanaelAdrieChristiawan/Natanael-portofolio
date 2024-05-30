import { motion } from "framer-motion";

const variants = {
    open: {
        transition: {
            staggerChildren: 0.1
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 50,
        opacity: 0,
    },
};

const Links = () => {
    const items = ["Homepage", "Experiences", "Portfolio", "Contact"];

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div className="links" variants={variants}>
            {items.map(item => (
                <motion.a
                    key={item}
                    onClick={() => scrollToSection(item)}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: "pointer" }}
                >
                    {item}
                </motion.a>
            ))}
        </motion.div>
    );
};

export default Links;
