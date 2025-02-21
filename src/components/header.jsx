import { useState, useEffect } from "react";

export default function Header() {
  const words1 = [
    "We are RPLG 1!",
    "Welcome to our web!",
    "Scroll down to explore",
  ];
  const words2 = [
    "console.log('let\'s find your experience')",
    "print('Follow IG RPLG1!')",
    "echo 'scroll to explore'",
  ];

  // State untuk teks pada <h1>
  const [text1, setText1] = useState("");
  const [index1, setIndex1] = useState(0);
  const [isDeleting1, setIsDeleting1] = useState(false);

  // State untuk teks pada terminal
  const [text2, setText2] = useState("");
  const [index2, setIndex2] = useState(0);
  const [isDeleting2, setIsDeleting2] = useState(false);

  const typingSpeed1 = 60;
  const deletingSpeed1 = 30;
  const pauseBeforeDelete1 = 3000;

  const typingSpeed2 = 15;
  const deletingSpeed2 = 15;
  const pauseBeforeDelete2 = 6000;

  // Efek mengetik untuk teks di <h1>
  useEffect(() => {
    const currentWord = words1[index1];
    let timeout;

    if (!isDeleting1) {
      if (text1.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText1(currentWord.substring(0, text1.length + 1));
        }, typingSpeed1);
      } else {
        timeout = setTimeout(() => setIsDeleting1(true), pauseBeforeDelete1);
      }
    } else {
      if (text1.length > 0) {
        timeout = setTimeout(() => {
          setText1(currentWord.substring(0, text1.length - 1));
        }, deletingSpeed1);
      } else {
        setIsDeleting1(false);
        setIndex1((prev) => (prev + 1) % words1.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text1, isDeleting1, index1]);

  // Efek mengetik untuk teks di terminal
  useEffect(() => {
    const currentWord = words2[index2];
    let timeout;

    if (!isDeleting2) {
      if (text2.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText2(currentWord.substring(0, text2.length + 1));
        }, typingSpeed2);
      } else {
        timeout = setTimeout(() => setIsDeleting2(true), pauseBeforeDelete2);
      }
    } else {
      if (text2.length > 0) {
        timeout = setTimeout(() => {
          setText2(currentWord.substring(0, text2.length - 1));
        }, deletingSpeed2);
      } else {
        setIsDeleting2(false);
        setIndex2((prev) => (prev + 1) % words2.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text2, isDeleting2, index2]);

  return (
    <header className="header">
      <div className="container">
        <div className="hero-section">
          <div className="hero-text">
            <div className="hero-title">Hi,</div>
            <div className="hero-subtitle">{text1}</div>
          </div>
          <div className="terminal-container">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="title">user@guess:~$</span>
            </div>
            <div className="terminal-body">
              <div className="text-terminal">
                $ cd c:\users\rplg1\desktop\<br></br>&gt;&gt; {text2}
                <span className="cursor">|</span>
              </div>
              {/* <div className="hero-image"></div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
