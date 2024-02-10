import React from "react";
import "./Layout.css";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link to="/">
          <h1>로고</h1>
        </Link>
        <ul>
          <li>버튼</li>
          <li>버튼</li>
        </ul>
      </nav>
      {children}
      <footer></footer>
    </>
  );
}
