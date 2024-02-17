import React, { useState, useEffect } from "react";
import "./Layout.css";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const [viewSide, setViewSide] = useState(false);

  // aside 있을때 스크롤 막기
  useEffect(() => {
    if (viewSide) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // 컴포넌트가 언마운트될 때 원래 상태로 되돌리기
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewSide]);

  const back = {
    start: { opacity: 0 },
    end: { opacity: 1 },
    transition: { duration: 0.2 },
  };

  const item = {
    start: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
    end: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  return (
    <>
      <nav>
        <h1>
          <Link to="/">pokemon</Link>
        </h1>
        <ul>
          <li className={pathname === "/" || pathname.includes("pokemon/") ? "active" : ""}>
            <Link to="/">도감</Link>
          </li>
          <li className={pathname === "/games" ? "active" : ""}>
            <Link to="/games">게임 시리즈</Link>
          </li>
          <li className={pathname.includes("/community") ? "active" : ""}>
            <Link to="/community">커뮤니티</Link>
          </li>
        </ul>
        <button id="ham" onClick={() => setViewSide(!viewSide)}>
          <GiHamburgerMenu />
        </button>
        {viewSide && (
          <motion.aside initial="start" animate="end" variants={back}>
            <motion.div id="sideTxtWrap" initial="start" animate="end" transition={{ staggerChildren: 0.1 }}>
              <motion.div className="sideTxt" variants={item}>
                <Link to="/">도감</Link>
              </motion.div>
              <motion.div className="sideTxt" variants={item}>
                <Link to="/games">게임 시리즈</Link>
              </motion.div>
              <motion.div className="sideTxt" variants={item}>
                <Link to="/community">커뮤니티</Link>
              </motion.div>
            </motion.div>
          </motion.aside>
        )}
      </nav>
      {children}
      <footer>
        <p id="footTit">pokedex</p>
        <div id="footFlex">
          <a href="https://pokeapi.co/" target="_blank">
            <p>api</p>
          </a>
          <a href="https://pokedex.hybridshivam.com/pokemon" target="_blank">
            <p>detail page design</p>
          </a>
          <a href="https://github.com/IdoBouskila/Pokedex">
            <p>main page design</p>
          </a>
          <a href="https://github.com/asdf080/pokemon">
            <p>github</p>
          </a>
        </div>
      </footer>
    </>
  );
}
