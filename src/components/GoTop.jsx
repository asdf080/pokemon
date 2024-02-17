import React from "react";
import { Link } from "react-router-dom";
import { PiArrowFatLineUpFill } from "react-icons/pi";

export default function GoTop() {
  return (
    <div style={{ position: "fixed", bottom: "15px", right: "15px", background: "#f39c12", color: "white", borderRadius: "50%", fontWeight: "bold", zIndex: "50", fontSize: "30px", width: "56px", height: "56px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={() => window.scroll({ top: 0, behavior: "smooth" })}>
      <PiArrowFatLineUpFill />
    </div>
  );
}
