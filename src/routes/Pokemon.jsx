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
  // const [sprImg, setSprImg] = useState(null);
  const { data: 성별정보 } = useQuery({
    queryKey: ["pokeInfo3", id],
    queryFn: () => apiGetPokes({ endpoint: `gender/1` }),
  });
  const 성비 = ((성별정보?.pokemon_species_details?.find((item) => item?.pokemon_species?.name === 기본정보?.name)?.rate / 8) * 100).toFixed(1);

  // useEffect(() => {
  //   if (!기본로딩중 && 기본정보) {
  //     setSprImg({
  //       url: 기본정보?.sprites.other[`official-artwork`].front_default || 기본정보?.sprites.other[`dream_world`].front_default || null,
  //       type: "default",
  //     });
  //   }
  // }, [id, 기본정보, 기본로딩중]);

  // const 이미지전환 = () => {
  //   if (sprImg.type === "default") {
  //     setSprImg({
  //       url: 기본정보?.sprites.other[`official-artwork`].front_shiny,
  //       type: "shiny",
  //     });
  //   } else {
  //     setSprImg({
  //       url: 기본정보?.sprites.other[`official-artwork`].front_default || 기본정보?.sprites.other[`dream_world`].front_default || null,
  //       type: "default",
  //     });
  //   }
  // };

  const 최대스탯 = 기본정보?.stats?.reduce((max, item) => Math.max(max, item.base_stat), 0);

  console.log(세부정보);

  const abilityQueries = useQueries({
    queries:
      기본정보?.abilities?.map((item) => ({
        queryKey: ["ability", item.ability.name],
        queryFn: async () => {
          try {
            const data = await fetch(item.ability.url).then((res) => res.json());
            return data;
          } catch (error) {}
        },
      })) ?? [],
  });

  const 특성 = abilityQueries?.map((result) => result.data ?? {});

  switch (세부정보?.color?.name) {
    case "red":
      document.documentElement.style.setProperty("--mainColor", "#ff8a80");
      document.documentElement.style.setProperty("--mainColor2", "#ff9b93");
      document.documentElement.style.setProperty("--mainColor3", "#d6a29d");
      break;

    case "white":
      document.documentElement.style.setProperty("--mainColor", "#c3d4e5");
      document.documentElement.style.setProperty("--mainColor2", "#d0d6e1");
      document.documentElement.style.setProperty("--mainColor3", "#bfc1c5");
      break;
    case "green":
      document.documentElement.style.setProperty("--mainColor", "#81C784");
      document.documentElement.style.setProperty("--mainColor2", "#94cf96");
      document.documentElement.style.setProperty("--mainColor3", "#badbbb");
      break;
    case "blue":
      document.documentElement.style.setProperty("--mainColor", "#81D4FA");
      document.documentElement.style.setProperty("--mainColor2", "#bee5ee");
      document.documentElement.style.setProperty("--mainColor3", "#b3e0eb");
      break;
    case "yellow":
      document.documentElement.style.setProperty("--mainColor", "#F2CB55");
      document.documentElement.style.setProperty("--mainColor2", "#f1e984");
      document.documentElement.style.setProperty("--mainColor3", "#efe56f");
      break;
    case "purple":
      document.documentElement.style.setProperty("--mainColor", "#AD8EE7");
      document.documentElement.style.setProperty("--mainColor2", "#b4a3d4");
      document.documentElement.style.setProperty("--mainColor3", "#b4a3d4");
      break;
    case "pink":
      document.documentElement.style.setProperty("--mainColor", "#E98ACC");
      document.documentElement.style.setProperty("--mainColor2", "#f39ebb");
      document.documentElement.style.setProperty("--mainColor3", "#F8BBD0");
      break;

    default:
      document.documentElement.style.setProperty("--mainColor", "#BCAAA4");
      document.documentElement.style.setProperty("--mainColor2", "#cfc5c5");
      document.documentElement.style.setProperty("--mainColor3", "#c7bbbb");
      break;
  }

  return (
    <Layout>
      {기본로딩중 ? (
        <div className="mainLoad">
          <Loader color="#f2cb55" height={30} margin={20} radius={10} width={10} />
        </div>
      ) : (
        <section key={id} id="pokeDetail">
          <h2>{세부정보?.names?.find((item) => item.language?.name == "ko")?.name || 기본정보?.name}</h2>
          <h3>
            <span>{세부정보?.genera?.find((item) => item.language?.name == "ko")?.genus || "???"}</span>
          </h3>

          <article id="detail1">
            <div id="leftTxtWrap">
              <div className="leftTit">ID</div>
              <div className="leftTxt">#{id}</div>
              <div className="leftTit">키·체중</div>
              <div className="leftTxt">
                {기본정보?.height * 10}cm &nbsp;&nbsp; {기본정보?.weight}kg
              </div>
              <div className="leftTit">특성</div>
              <div className="leftTxt">
                {특성?.map((item, index) => (
                  <p className={`abilIcon abilIcon${index}`} key={index}>
                    {item.names?.find((name) => name.language?.name === "ko")?.name}
                  </p>
                ))}
              </div>
              <div className="leftTit">타입</div>
              <div className="leftTxt">
                <p className={`${기본정보?.types[0].type.name} typeIcon`}>{기본정보?.types[0].type.name}</p>
                <p className={`${기본정보?.types[1]?.type.name || ""} typeIcon`}>{기본정보?.types[1]?.type.name || null}</p>
              </div>
              <div className="leftTit">형태</div>
              <div className="leftTxt">
                {세부정보?.varieties.map((item, index) => (
                  <p key={index} className="variIcon">
                    {item.pokemon.name.replace(기본정보.name, 세부정보?.names?.find((item) => item.language.name == "ko")?.name || 기본정보.name)}
                  </p>
                ))}
              </div>
            </div>
            <img key={id} src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id.padStart(3, "0")}.png`} alt="artwork" />
            <div id="rightTxtWrap">
              <div id="rightTxtWrapInner">
                {기본정보?.stats?.map((item, index) => (
                  <div key={index} className="progWrap">
                    <div className="progName">{item.stat.name.replace("special-", "sp. ")}</div>
                    <div className="progress">
                      <div style={{ width: `${(item.base_stat / 최대스탯) * 100}%` }}>{item[`base_stat`]}</div>
                    </div>
                  </div>
                ))}
                <div className="progWrap">
                  <p className="progName">total</p>
                  <p>{기본정보?.stats?.reduce((a, b) => a + b.base_stat, 0)}</p>
                </div>
              </div>
            </div>
          </article>
          <h4>{세부정보?.flavor_text_entries?.find((item) => item.language.name === "ko")?.flavor_text}</h4>
          <article id="detail2">
            <div className="underWrap">
              <h5>세부 정보</h5>
              <div className="underTxt">
                <div className="underTit">소지 아이템</div>
                <div>{기본정보?.held_items?.[0]?.item?.name || "없음"}</div>
                <div className="underTit">서식지</div>
                <div>{세부정보?.habitat?.name}</div>
                <div className="underTit">색상</div>
                <div>{세부정보?.color?.name}</div>
                <div className="underTit">친밀도</div>
                <div>{세부정보?.base_happiness}</div>
                <div className="underTit">포획률</div>
                <div>{세부정보?.capture_rate}</div>
              </div>
            </div>
            <div className="underWrap">
              <h5>육성 정보</h5>
              <div className="underTxt">
                <div className="underTit">기초 경험치</div>
                <div className="">{기본정보?.base_experience}</div>
                <div className="underTit">알 그룹</div>
                <div>
                  {세부정보?.egg_groups.map((item, index) => (
                    <p key={index}>{item.name}</p>
                  ))}
                </div>
                <div className="underTit">부화 카운트</div>
                <div>{세부정보?.hatch_counter}</div>
                <div className="underTit">성장 속도</div>
                <div>{세부정보?.growth_rate.name}</div>
                <div className="underTit">성비</div>
                <div>
                  <p>{성비}%</p>
                  <p>{100 - 성비}%</p>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </Layout>
  );
}
