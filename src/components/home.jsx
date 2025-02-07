import { useState, useEffect, useRef } from "react";
import maskotImage from '../assets/maskot.jpeg';

function Home() {
  const text = "Kami adalah RPLG 1 angkatan 2022-2025";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
        } else {
          setStartTyping(false);
          setDisplayText(""); // Reset teks saat keluar dari viewport
          setIndex(0);
        }
      },
      { threshold: 0.5 } // Aktif jika 50% elemen terlihat
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (startTyping && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text, startTyping]);

  return (
    <section className="home">
      <div className="home-container">
        <div ref={textRef} className="text-container">
          <h3 className="typing-text">{displayText}<span className="cursor">|</span></h3>
        </div>
        <div className="image-container">
        <img src={maskotImage} alt="Profile" className="profile-image" style={{ width: '120px', height: 'auto' }}/>
        </div>
      </div>
    </section>
  );
}

export default Home;
