import { useState, useEffect } from "react";

export default function Header() {
  const words = [
    "We are RPLG 1!",
    "Welcome to our website!",
    "Let's find something amazing!",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? 5 : 50; // Kecepatan mengetik/menghapus

  useEffect(() => {
    const currentWord = words[index];
    let timeout;

    if (!isDeleting) {
      // Efek Mengetik
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000); // Tunggu sebelum menghapus
      }
    } else {
      // Efek Menghapus
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <header className="header">
      <div className="container">
        <div className="hero-section">
          <div class="terminal-container">
            <div class="terminal-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="title">user@guess:~$</span>
            </div>
            <div class="terminal-body">
                $ echo "Hello World"<br></br>&gt;&gt; {text}
                <span className="cursor">|</span>
            </div>
          </div>
          <div className="hero-image"></div>
        </div>
      </div>
    </header>
  );
}
