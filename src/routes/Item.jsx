import React from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import { 글리스트 } from "../lib/ComItem";
import "./style/Item.css";
import { FaComment } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

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
            {글데이터.img.length > 0 && 글데이터.img.map((img, index) => <img key={index} src={`${img}`} alt="img" />)}
            <div dangerouslySetInnerHTML={{ __html: 글데이터.content }}></div>
          </div>
          <Link to="/community">
            <button>
              <IoMdArrowRoundBack /> 돌아가기
            </button>
          </Link>
        </article>
      </section>
    </Layout>
  );
}
