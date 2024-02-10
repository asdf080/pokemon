import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { apiGetPokes } from "../utils/api";
import Loader from "react-spinners/FadeLoader";
import "./style/Pokemon.css";

export default function Pokemon() {
  const { id } = useParams();
  const { data: 기본정보, isLoading: 기본로딩중 } = useQuery({ queryKey: ["pokeInfo", id], queryFn: () => apiGetPokes({ endpoint: `pokemon/${id}` }) });
  const { data: 세부정보, isLoading: 세부로딩중 } = useQuery({ queryKey: ["pokeInfo2", id], queryFn: () => apiGetPokes({ endpoint: `pokemon-species/${id}` }) });
  const [sprImg, setSprImg] = useState(null);

  useEffect(() => {
    if (!기본로딩중 && 기본정보) {
      setSprImg({
        url: 기본정보?.sprites.other[`official-artwork`].front_default || 기본정보?.sprites.other[`dream_world`].front_default || null,
        type: "default",
      });
    }
  }, [id, 기본정보, 기본로딩중]);

  const 이미지전환 = () => {
    if (sprImg.type === "default") {
      setSprImg({
        url: 기본정보?.sprites.other[`official-artwork`].front_shiny,
        type: "shiny",
      });
    } else {
      setSprImg({
        url: 기본정보?.sprites.other[`official-artwork`].front_default || 기본정보?.sprites.other[`dream_world`].front_default || null,
        type: "default",
      });
    }
  };

  const 최대스탯 = 기본정보?.stats?.reduce((max, item) => Math.max(max, item.base_stat), 0);

  console.log(세부정보);

  return (
    <Layout>
      {기본로딩중 || !sprImg ? (
        <div className="mainLoad">
          <Loader color="#f2cb55" height={30} margin={20} radius={10} width={10} />
        </div>
      ) : (
        <section key={id} id="pokeDetail">
          <h2>{세부정보?.names?.find((item) => item.language.name == "ko")?.name || 기본정보.name}</h2>
          <h3>
            <span>{세부정보?.genera?.find((item) => item.language.name == "ko")?.genus || "???"}</span>
          </h3>

          <article id="detail1">
            <div id="leftTxtWrap">
              <div className="leftTit">ID</div>
              <div className="leftTxt">#{id}</div>
              <div className="leftTit">키·체중</div>
              <div className="leftTxt">
                {기본정보?.height * 10}cm &nbsp;&nbsp; {기본정보?.weight}kg
              </div>
              <div className="leftTit">기초 경험치</div>
              <div className="leftTxt">{기본정보?.base_experience}</div>

              <div className="leftTit">타입</div>
              <div className="leftTxt">
                <p className={`${기본정보?.types[0].type.name} typeIcon`}>{기본정보?.types[0].type.name}</p>
                <p className={`${기본정보?.types[1]?.type.name || ""} typeIcon`}>{기본정보?.types[1]?.type.name || null}</p>
              </div>
              <div className="leftTit">형태</div>
              <div className="leftTxt">
                {세부정보?.varieties.map((item) => (
                  <p className="variIcon">{item.pokemon.name}</p>
                ))}
              </div>
              {기본정보?.sprites.other[`official-artwork`].front_shiny && <button onClick={이미지전환}>다른 색상</button>}
            </div>
            <img key={id} src={sprImg.url} alt="artwork" />
            <div id="rightTxtWrap">
              {기본정보?.stats?.map((item, index) => (
                <div key={index}>
                  <div className="progName">{item.stat.name.replace("special-", "sp. ")}</div>
                  <div className="progress">
                    <div style={{ width: `${(item.base_stat / 최대스탯) * 100}%` }}>{item[`base_stat`]}</div>
                  </div>
                </div>
              ))}
              <div>
                <p className="progName">total</p>
                <p>{기본정보?.stats?.reduce((a, b) => a + b.base_stat, 0)}</p>
              </div>
            </div>
          </article>
          <h4>{세부정보?.flavor_text_entries?.find((item) => item.language.name === "ko").flavor_text}</h4>
          <article id="detail2">
            <div className="underWrap">
              <h5>세부 정보</h5>
              <div className="underTxt">
                <div className="underTit">소지 아이템</div>
                <div>{기본정보?.held_items?.[0]?.item?.name || "없음"}</div>
                <div className="underTit">서식지</div>
                <div>{세부정보?.habitat.name}</div>
                <div className="underTit">성장 속도</div>
                <div>{세부정보?.growth_rate.name}</div>
                <div className="underTit">친밀도</div>
                <div>{세부정보?.base_happiness}</div>
                <div className="underTit">포획률</div>
                <div>{세부정보?.capture_rate}</div>
              </div>
            </div>
          </article>
        </section>
      )}
    </Layout>
  );
}
