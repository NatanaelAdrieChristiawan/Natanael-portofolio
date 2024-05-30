import Sidebar from "../sidebar/Sidebar"
import "./navbar.scss"
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <div className="navbar">
        {/* {sidebar} */}
        <Sidebar />
        <div className="wrapper">
            <motion.span 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration:0.5 }} 
            >
                Natan Dev
            </motion.span>
            <div className="social">
                <a href="https://www.facebook.com/natanael.a.christiawan/" target="_blank" rel="noopener noreferrer"><img src="/facebook.png" alt="" /></a>
                <a href="https://www.instagram.com/natanael_prakosa" target="_blank" rel="noopener noreferrer"><img src="/instagram.png" alt="" /></a>
                <a href="https://x.com/Natanael_Adrie" target="_blank" rel="noopener noreferrer"><img src="/X.png" alt="" /></a>
            </div>
        </div>
    </div>
  )
}

export default Navbar