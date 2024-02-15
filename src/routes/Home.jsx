import React, { useState } from "react";
import "./style/Home.css";
import "./style/typeColor.css";
import { useQueries, useQuery } from "@tanstack/react-query";
import { apiGetPokes } from "../utils/api";
import Loader from "react-spinners/FadeLoader";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout";
import { motion } from "framer-motion";

export default function home() {
  const [typenum, setTypenum] = useState(3);
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
      기본정보
        ?.filter((item) => item.id < 906)
        .map((item) => ({
          queryKey: ["pokemon-species", item.id],
          queryFn: async () => {
            try {
              const data = await apiGetPokes({ endpoint: `pokemon-species/${item.id}` });
              return data;
            } catch (error) {}
          },
        })) ?? [],
  });
  const 세부정보 = queryResults.map((result) => result.data ?? {});
  const 타입목록 = [
    { name: "노말", class: "normal" },
    { name: "격투", class: "fighting" },
    { name: "비행", class: "flying" },
    { name: "독", class: "poison" },
    { name: "땅", class: "ground" },
    { name: "바위", class: "rock" },
    { name: "벌레", class: "bug" },
    { name: "고스트", class: "ghost" },
    { name: "강철", class: "steel" },
    { name: "불꽃", class: "fire" },
    { name: "물", class: "water" },
    { name: "풀", class: "grass" },
    { name: "전기", class: "electric" },
    { name: "에스퍼", class: "psychic" },
    { name: "얼음", class: "ice" },
    { name: "드래곤", class: "dragon" },
    { name: "악", class: "dark" },
    { name: "페어리", class: "fairy" },
  ];

  const pokeCardItem = {
    start: { y: 70 },
    end: { y: 0 },
  };

  return (
    <Layout>
      <section id="homePage">
        <header>
          {타입목록.map((type, index) => (
            <button key={index} className={type.class} onClick={() => setTypenum(index + 1)}>
              {type.name}
            </button>
          ))}
        </header>
        {기본정보로딩중 ? (
          <div className="mainLoad">
            <Loader color="#f2cb55" height={30} margin={20} radius={10} width={10} />
          </div>
        ) : (
          <motion.main initial="start" animate="end" transition={{ staggerChildren: 0.04 }}>
            {기본정보?.map(
              (item, index) =>
                item.id < 906 && (
                  <motion.div id="pokeCardWrap" variants={pokeCardItem}>
                    <Link key={index} to={`/pokemon/${item.id}`}>
                      <div className={`pokeCard ${item.types[0]?.type.name}Card`}>
                        <div className="cardTxt">
                          <div>
                            <p className="txtId">#{item.id}</p>
                            <p className="txtName">{세부정보?.[index].names?.find((item) => item.language.name === "ko")?.name}</p>
                          </div>
                          <div className="txtType">
                            <p className={item.types[0]?.type.name}>{item.types[0]?.type.name}</p>
                            <p className={item.types[1]?.type.name || ""}>{item.types[1]?.type.name || ""}</p>
                          </div>
                        </div>
                        <img src={item.sprites.other[`official-artwork`]?.front_default || item.sprites.other[`dream_world`]?.front_default || ""} alt={item.name} />
                        <div className="back"></div>
                      </div>
                    </Link>
                  </motion.div>
                )
            )}
          </motion.main>
        )}
      </section>
    </Layout>
  );
}
