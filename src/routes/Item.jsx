import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { 글리스트 } from "../lib/ComItem";
import "./style/Item.css";
import { FaComment } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";

export default function Item() {
  const { index: pageIndex } = useParams();
  const 글데이터 = 글리스트[pageIndex];

  return (
    <Layout>
      <section id="comItem">
        <article>
          <h3>{글데이터.tit}</h3>
          <div id="titDetail">
            <span>{글데이터.time}</span>
            <div>
              <span>
                <FaComment />
                &nbsp;{글데이터.re}
              </span>
              <span>
                <RiEyeLine size="21px" /> &nbsp;{글데이터.view}
              </span>
            </div>
          </div>
          <hr />
          <div id="content">
            <img src={글데이터.img} alt="img" />
            <div>{글데이터.content}</div>
          </div>
        </article>
      </section>
    </Layout>
  );
}
