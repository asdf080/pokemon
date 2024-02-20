import React, { useEffect, useState } from "react";
import { PiArrowFatLineUpFill } from "react-icons/pi";

export default function GoTop() {
  const [clicked, setClicked] = useState(false);
  const [bottom, setBottom] = useState("15px");

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top;

      if (footerTop <= window.innerHeight) {
        const bottomValue = window.innerHeight - footerTop + 15;
        setBottom(`${bottomValue}px`);
      } else {
        setBottom("15px");
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ position: "fixed", bottom: bottom, right: "15px", background: "#f39c12", color: "white", borderRadius: "50%", fontWeight: "bold", zIndex: "50", fontSize: "30px", width: "56px", height: "56px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", transform: clicked ? "scale(0.8)" : "scale(1)", transition: "0.2s" }}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onMouseLeave={() => setClicked(false)}
      onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
    >
      <PiArrowFatLineUpFill />
    </div>
  );
}
