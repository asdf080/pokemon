import React from "react";
import Layout from "../components/Layout";
import "./style/Write.css";

export default function Write() {
  return (
    <Layout>
      <section id="writeSect">
        <form>
          <div>
            <input type="text" placeholder="제목" />
          </div>
          <div>
            <textarea placeholder="내용"></textarea>
          </div>
          <button>등록</button>
        </form>
      </section>
    </Layout>
  );
}
