import React, { useState } from "react";
import "./Home.css";
import { useQueries, useQuery } from "@tanstack/react-query";
import { apiGetPokes } from "./utils/api";

export default function home() {
  const [typenum, setTypenum] = useState(2);
  const { data: 기본정보, isLoading: 기본정보로딩중 } = useQuery({
    queryKey: ["pokesmons", `type/${typenum}`],
    queryFn: async () => {
      // 포켓몬 이름, 도감 정보api url이 타입별로 들어있는 배열 호출
      const { pokemon: pokemonArr } = await apiGetPokes({ endpoint: `type/${typenum}` });

      // 도감 정보api url로 도감 정보 호출
      const pokemons = await Promise.all(
        pokemonArr.map(async ({ pokemon }) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      return pokemons;
    },
  });

  // 도감 정보 id로 세부 정보 호출
  const queryResults = useQueries({
    queries:
      기본정보?.map((item) => ({
        queryKey: ["pokemon-species", item.id],
        queryFn: async () => {
          try {
            const data = await apiGetPokes({ endpoint: `pokemon-species/${item.id}` });
            return data;
          } catch (error) {
            return {};
          }
        },
      })) ?? [],
  });
  const 세부정보 = queryResults.map((result) => result.data ?? {});
  const 세부정보로딩 = queryResults?.[queryResults.length - 1]?.isLoading;
  console.log(세부정보로딩);
  console.log(기본정보로딩중);

  return (
    <section id="homePage">
      {기본정보로딩중 ? <div id="mainLoad">로딩중</div> : null}
      <nav>
        <h1>로고</h1>
        <ul>
          <li>버튼</li>
          <li>버튼</li>
        </ul>
      </nav>
      <header>
        <button className="normal" onClick={() => setTypenum(1)}>
          노말
        </button>
        <button className="fighting" onClick={() => setTypenum(2)}>
          격투
        </button>
        <button className="flying" onClick={() => setTypenum(3)}>
          비행
        </button>
        <button className="poison" onClick={() => setTypenum(4)}>
          독
        </button>
        <button className="ground" onClick={() => setTypenum(5)}>
          땅
        </button>
        <button className="rock" onClick={() => setTypenum(6)}>
          바위
        </button>
        <button className="bug" onClick={() => setTypenum(7)}>
          벌레
        </button>
        <button className="ghost" onClick={() => setTypenum(8)}>
          고스트
        </button>
        <button className="steel" onClick={() => setTypenum(9)}>
          강철
        </button>
        <button className="fire" onClick={() => setTypenum(10)}>
          불꽃
        </button>
        <button className="water" onClick={() => setTypenum(11)}>
          물
        </button>
        <button className="grass" onClick={() => setTypenum(12)}>
          풀
        </button>
        <button className="eletric" onClick={() => setTypenum(13)}>
          전기
        </button>
        <button className="psychic" onClick={() => setTypenum(14)}>
          에스퍼
        </button>
        <button className="ice" onClick={() => setTypenum(15)}>
          얼음
        </button>
        <button className="dragon" onClick={() => setTypenum(16)}>
          드래곤
        </button>
        <button className="dark" onClick={() => setTypenum(17)}>
          악
        </button>
        <button className="fairy" onClick={() => setTypenum(18)}>
          페어리
        </button>
      </header>
      <main>
        {기본정보?.map((item, index) => (
          <div className="pokeCard" key={index}>
            <div className="cardTxt">
              <div>
                <p className="txtId">#{item.id}</p>
                <p className="txtName">{세부정보?.[index].names?.find((item) => item.language.name === "ko")?.name || item.name}</p>
              </div>
              <div className="txtType">
                <p className={item.types[0]?.type.name}>{item.types[0]?.type.name}</p>
                <p className={item.types[1]?.type.name || ""}>{item.types[1]?.type.name || ""}</p>
              </div>
            </div>
            <img src={item.sprites.other[`official-artwork`]?.front_default || item.sprites.other[`dream_world`]?.front_default || ""} alt={item.name} />
          </div>
        ))}
      </main>
    </section>
  );
}
