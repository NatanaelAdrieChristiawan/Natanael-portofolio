// App.jsx (Final dengan perbaikan)

import { useEffect } from "react"; // 1. Mengimpor hook useEffect dari React
import "./app.scss";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";

const App = () => {
  // 2. Menambahkan useEffect untuk memperbaiki masalah unit 'vh' di mobile
  useEffect(() => {
    // Fungsi untuk menghitung dan mengatur variabel --vh
    const setRealVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Panggil fungsi saat komponen pertama kali render
    setRealVH();

    // Tambahkan event listener untuk memanggil fungsi lagi jika ukuran window berubah
    window.addEventListener('resize', setRealVH);

    // Fungsi cleanup untuk menghapus event listener saat komponen di-unmount
    return () => window.removeEventListener('resize', setRealVH);
  }, []); // Array dependensi kosong '[]' memastikan efek ini hanya berjalan sekali

  return (
    <div>
      <Cursor/>
      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>
      <section id="Experiences">
        <Parallax type="services" />
      </section>
      <section>
        <Services />
      </section>
      <section id="Portfolio">
        <Parallax type="portfolio" />
      </section>
      <Portfolio />
      <section id="Contact">
        <Contact />
      </section>
      {/* <Test/> */}
    </div>
  );
};

export default App;