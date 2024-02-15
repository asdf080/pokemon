import React from "react";
import "./Layout.css";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();

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
            <Link to="/games">게임</Link>
          </li>
          <li>
            <Link to="/games">커뮤니티</Link>
          </li>
        </ul>
      </nav>
      {children}
      <footer></footer>
    </>
  );
}
