import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { apiGetPokes } from "../utils/api";
import switchColor from "../utils/switchColor";
import Loader from "react-spinners/FadeLoader";
import "./style/Pokemon.css";
import { BounceLoader } from "react-spinners";
import { 타입목록, 알그룹, 색상이름, 서식지이름, 성장속도 } from "../lib/names";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";

export default function Pokemon() {
  console.clear();
  const [show특성, setShow특성] = useState({});
  const 특성Ref = useRef(null);

  const { id } = useParams();
  const { data: 기본정보, isLoading: 기본로딩중 } = useQuery({ queryKey: ["pokeInfo", id], queryFn: () => apiGetPokes({ endpoint: `pokemon/${id}` }) });
  const { data: 세부정보 } = useQuery({ queryKey: ["pokeInfo2", id], queryFn: () => apiGetPokes({ endpoint: `pokemon-species/${id}` }) });

  const { data: 성별정보 } = useQuery({
    queryKey: ["pokeInfo3", id],
    queryFn: () => apiGetPokes({ endpoint: `gender/1` }),
  });
  const { data: 상성정보 } = useQuery({
    queryKey: ["pokeInfo4", id],
    queryFn: async () => {
      try {
        const data = await fetch(기본정보?.types?.[1].type.url || 기본정보?.types?.[0].type.url).then((res) => res.json());
        return data;
      } catch (error) {}
    },
  });

  const { data: 아이템정보 } = useQuery({
    queryKey: ["pokeItemInfo", id],
    queryFn: async () => {
      try {
        const data = await fetch(기본정보?.held_items?.[0].item.url).then((res) => res.json());
        return data;
      } catch (error) {}
    },
  });

  let 성비 = ((성별정보?.pokemon_species_details?.find((item) => item?.pokemon_species?.name === 기본정보?.name)?.rate / 8) * 100).toFixed(1);
  성비 = `${성비}`.endsWith(".0") ? 성비.slice(0, -2) : 성비;

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

  const 최대스탯 = 기본정보?.stats?.reduce((max, item) => Math.max(max, item.base_stat), 0);

  const [sprImg, setSprImg] = useState("");
  const 이미지주소 = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id?.padStart(3, "0")}${sprImg}.png`;

  switchColor(세부정보?.color?.name);

  function 형태변환(name) {
    const parts = name.split("-").slice(1); // 이명 추출
    if (!parts.length) return name; // 이명 없으면 원본 반환
    return (
      "-" +
      parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // 대문자로
        .join("-")
    );
  }
  console.log(세부정보);

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
                {기본정보?.height * 10}cm &nbsp;&nbsp; {기본정보?.weight / 10}kg
              </div>
              <div className="leftTit">특성</div>
              <div className="leftTxt">
                {특성?.map((item, index) => (
                  <span key={index}>
                    <p ref={특성Ref} onMouseOver={() => setShow특성((prev) => ({ ...prev, [index]: true }))} onMouseLeave={() => setShow특성((prev) => ({ ...prev, [index]: false }))} className={`abilIcon abilIcon${index}`} style={{ position: "relative", cursor: "pointer" }}>
                      {item.names?.find((name) => name.language?.name === "ko")?.name}
                    </p>
                    {show특성[index] && <p id="modals">{item.flavor_text_entries?.find((fla) => fla.language.name === "ko")?.flavor_text}</p>}
                  </span>
                ))}
              </div>
              <div className="leftTit">타입</div>
              <div className="leftTxt">
                <p className={`${기본정보?.types[0].type.name} typeIcon`}>{타입목록.find((타입) => 타입.class === 기본정보?.types[0].type.name).name}</p>
                <p className={`${기본정보?.types[1]?.type.name || ""} typeIcon`}>{타입목록.find((타입) => 타입.class === 기본정보?.types[1]?.type.name)?.name || null}</p>
              </div>
              <div className="leftTit">형태</div>
              <div className="leftTxt">
                <p className="variIcon" onClick={() => setSprImg("")}>
                  {세부정보?.names?.find((item) => item.language?.name == "ko")?.name || 기본정보?.name}
                </p>
                {세부정보?.varieties.slice(1).map((item, index) => (
                  <p key={index} className="variIcon" onClick={() => setSprImg(형태변환(item.pokemon.name))}>
                    {item.pokemon.name.replace(기본정보.name, 세부정보?.names?.find((item) => item.language.name == "ko")?.name || 기본정보.name)}
                  </p>
                ))}
              </div>
            </div>
            <img
              key={id}
              src={이미지주소}
              alt="artwork"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "http://via.placeholder.com/500x500";
              }}
            />
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
          <article id="detail3">
            <div className="underWrap">
              <h5>세부 정보</h5>
              <div className="underTxt">
                <div className="underTit">소지 아이템</div>
                <div>{아이템정보?.names?.find((item) => item.language.name === "ko").name || 기본정보?.held_items?.[0]?.item?.name || "없음"}</div>
                <div className="underTit">서식지</div>
                <div>{서식지이름[세부정보?.habitat?.name] || "-"}</div>
                <div className="underTit">색상</div>
                <div>{색상이름[세부정보?.color?.name]}</div>
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
                <div className="underflex">
                  {세부정보?.egg_groups.map((item, index) => (
                    <p key={index}>{item.name === "no-eggs" ? "-" : 알그룹[item.name] || item.name}</p>
                  ))}
                </div>
                <div className="underTit">부화 카운트</div>
                <div>{세부정보?.hatch_counter}</div>
                <div className="underTit">성장 속도</div>
                <div>{성장속도[세부정보?.growth_rate.name] || "-"}</div>
                <div className="underTit">성비</div>
                <div className="underflex">
                  <p>
                    <PiGenderFemaleBold />
                    {isNaN(성비) ? "-" : 성비}%
                  </p>
                  <p>
                    <PiGenderMaleBold />
                    {isNaN(100 - 성비) ? "-" : 100 - 성비}%
                  </p>
                </div>
              </div>
            </div>
            <div className="underWrap">
              <h5>방어 상성</h5>
              <ul className="underList">
                {상성정보 ? (
                  ""
                ) : (
                  <div id="defenseLoad">
                    <BounceLoader color="#aaa" />
                  </div>
                )}
                <li>
                  <div className="typesleft">0x</div>
                  <div className="typesWrap">
                    {상성정보?.damage_relations?.no_damage_from?.map((item) => (
                      <img key={item.name} className={`${item.name} typeIcon2`} src={`/type/${item.name}.png`} alt={item.name} />
                    ))}
                  </div>
                </li>
                <li style={{ padding: "0 10px 0 30px" }}>
                  <div className="typesleft">0.25x</div>
                  <div className="typesWrap"></div>
                </li>
                <li>
                  <div className="typesleft">0.5x</div>
                  <div className="typesWrap">
                    {상성정보?.damage_relations?.half_damage_from?.map((item) => (
                      <img key={item.name} className={`${item.name} typeIcon2`} src={`/type/${item.name}.png`} alt={item.name} />
                    ))}
                  </div>
                </li>
                <li>
                  <div className="typesleft">2x</div>
                  <div className="typesWrap">
                    {상성정보?.damage_relations?.double_damage_from?.map((item) => (
                      <img key={item.name} className={`${item.name} typeIcon2`} src={`/type/${item.name}.png`} alt={item.name} />
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </article>
        </section>
      )}
    </Layout>
  );
}
