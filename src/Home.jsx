import React from "react";
import "./Home.css";
import { useQuery } from "@tanstack/react-query";
import { apiGetPokes } from "./utils/api";

export default function home() {
  const { data, isLoading } = useQuery({
    queryKey: ["pokesmons", "type/1"],
    queryFn: ({ typenum = 1 }) => apiGetPokes({ endpoint: `type/${typenum}` }),
  });
  console.log(data?.pokemon);
  return (
    <section id="homePage">
      {/* {isLoading ? <div id="mainLoad">로딩중</div> : null} */}
      <nav>
        <h1>로고</h1>
        <ul>
          <li>메뉴1</li>
          <li>메뉴2</li>
        </ul>
      </nav>
      <header>
        <input type="text" placeholder="검색창" />
        <ul>
          <li>아이콘</li>
          <li>아이콘</li>
        </ul>
      </header>
      <main>
        <div className="pokeCard">
          <div className="cardTxt">
            <p>번호</p>
            <p>이름</p>
            <div>
              <p>속성</p>
              <p>속성</p>
            </div>
          </div>
          <div>이미지</div>
        </div>
        <div className="pokeCard">card1</div>
        <div className="pokeCard">card1</div>
        <div className="pokeCard">card1</div>
        <div className="pokeCard">card1</div>
      </main>
    </section>
  );
}
