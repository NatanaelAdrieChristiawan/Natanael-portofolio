import { useRef } from "react";
import "./clientReviews.scss";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

// Animation Variants
const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    initial: {
        opacity: 0,
        y: 40,
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

// ===================================
// CLIENT REVIEWS DATA
// Untuk menambahkan review baru, cukup tambahkan objek baru ke array di bawah ini.
// Tidak perlu mengubah kode komponen lainnya.
// ===================================
const clientReviews = [
    {
        id: 1,
        name: "Winston",
        role: "Founder, Mari Renov",
        review: "Bagus banget hasil kerjanya, dikasih revisi hingga puas. Sangat detail dan sama persis seperti desain yang di-inginkan. BAGUS BANGET.",
        avatar: null, // Set null untuk menggunakan initial
        rating: 5,
    },
    {
        id: 2,
        name: "Kris Oktina",
        role: "Manager, Go Media Malaysia",
        review: "Working with Natan was an absolute game-changer for my business. He completely understood my vision for a modern and user-friendly website and brought it to life with stunning design and functionality. The attention to detail was outstanding, and he was incredibly responsive and communicative throughout the entire process. My new website is now a key asset for attracting new customers and showcasing my brand. I highly recommend Natan to anyone looking for a talented and reliable web designer. ",


        avatar: null,
        rating: 5,
    },
    {
        id: 3,
        name: "Bedjo",
        role: "Founder, Rumah Batik Bedjo",
        review: "Pekerjaan di selesaikan dengan baik, optimisasi website saya bisa di optimisasikan dengan lancar. Terimakasih.",
        avatar: null,
        rating: 5,
    },
    // Tambahkan review baru di sini dengan format yang sama:
    // {
    //     id: 4,
    //     name: "Nama Client",
    //     role: "Posisi, Perusahaan",
    //     review: "Isi review...",
    //     avatar: "/path/to/avatar.jpg", // atau null untuk initial
    //     rating: 5, // 1-5
    // },
];

// Helper function untuk mendapatkan initial dari nama
const getInitials = (name) => {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

// Komponen untuk menampilkan rating bintang
const StarRating = ({ rating }) => {
    return (
        <div className="starRating">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    className={`star ${index < rating ? "filled" : "empty"}`}
                />
            ))}
        </div>
    );
};

const ClientReviews = () => {
    const ref = useRef();

    return (
        <section id="reviews" className="clientReviews" ref={ref}>
            <div className="container">
                {/* Header Title */}
                <motion.div
                    className="headerTitle"
                    variants={headerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <span className="accent">Testimonials</span>
                    <h2>What Clients Say</h2>
                </motion.div>

                {/* Reviews Grid */}
                <motion.div
                    className="reviewsGrid"
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {clientReviews.map((client) => (
                        <motion.div
                            key={client.id}
                            className="reviewCard"
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Quote Icon */}
                            <div className="quoteIcon">
                                <FaQuoteLeft />
                            </div>

                            {/* Review Content */}
                            <p className="reviewText">{client.review}</p>

                            {/* Rating */}
                            <StarRating rating={client.rating} />

                            {/* Client Info */}
                            <div className="clientInfo">
                                <div className="avatar">
                                    {client.avatar ? (
                                        <img src={client.avatar} alt={client.name} />
                                    ) : (
                                        <span className="initial">{getInitials(client.name)}</span>
                                    )}
                                </div>
                                <div className="details">
                                    <h4 className="clientName">{client.name}</h4>
                                    <p className="clientRole">{client.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientReviews;
