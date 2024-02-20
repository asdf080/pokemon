import React, { useState } from "react";
import { PiArrowFatLineUpFill } from "react-icons/pi";

export default function GoTop() {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      style={{ position: "fixed", bottom: "15px", right: "15px", background: "#f39c12", color: "white", borderRadius: "50%", fontWeight: "bold", zIndex: "50", fontSize: "30px", width: "56px", height: "56px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", transform: clicked ? "scale(0.8)" : "scale(1)", transition: "0.2s" }}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onMouseLeave={() => setClicked(false)}
      onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
    >
      <PiArrowFatLineUpFill />
    </div>
  );
}
