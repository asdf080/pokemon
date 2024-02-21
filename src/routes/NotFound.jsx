import React from "react";
import Layout from "./../components/Layout";
import notFound from "../assets/notFound.json";
import Lottie from "lottie-react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navi = useNavigate();
  return (
    <Layout>
      <section id="notFound" style={{ height: "85vh", width: "80vw", margin: "0 auto", textAlign: "center", textTransform: "uppercase" }}>
        <Lottie animationData={notFound} style={{ height: "60vh" }} />
        <h2 style={{ margin: "20px 0 0", fontSize: "2em" }}>페이지를 찾을 수 없습니다.</h2>
        <button style={{ margin: "15px auto 0", border: "none", padding: "10px 25px", fontSize: "1.2em", borderRadius: "10px", display: "flex", alignItems: "center", background: "#fff5e2" }} onClick={() => navi(-1)}>
          <IoArrowBackOutline />
          &nbsp; 뒤로 가기
        </button>
      </section>
    </Layout>
  );
}
