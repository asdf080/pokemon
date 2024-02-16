import React from "react";
import Layout from "../components/Layout";
import "./style/Games.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiNintendo3Ds } from "react-icons/si";
import GoTop from "./../components/GoTop";

const LineEle = (props) => (
  <VerticalTimelineElement className="vertical-timeline-element--work" date={props.date} icon={props.icon} iconStyle={{ background: props.color, color: "#fff" }}>
    <h3 className="vertical-timeline-element-title">{props.tit}</h3>
    <h4 className="vertical-timeline-element-subtitle">{props.tit2}</h4>
    <p>{props.p}</p>
  </VerticalTimelineElement>
);
export default function Games() {
  return (
    <Layout>
      <section id="gamePage">
        <GoTop />
        <VerticalTimeline>
          <LineEle date="2022.11" icon={<BsNintendoSwitch />} tit="포켓몬스터 스칼렛·바이올렛" tit2="최초의 오픈월드 작품" p="자유롭게 돌아다닐 수 있는 필드에서 스토리에 의해 정해진 순서가 없는 새로운 스타일의 모험을 체험할 수 있습니다. 포켓몬 트레이너로서 실력을 연마하기 위해 여행하는 모험은 물론, 그 밖에도 수많은 발견과 이야기가 기다리고 있습니다. 다양한 사람이나 포켓몬을 만나며, 자유롭게 「포켓몬스터」의 세계를 모험해 보시기 바랍니다." color="#F7463E" />
          <LineEle date="2022.01" icon={<BsNintendoSwitch />} tit="포켓몬 LEGENDS 아르세우스" tit2="액션과 알피지를 융합한 차별화된 시스템" p="플레이어는 웅대한 자연을 탐험하며 그곳에 서식하는 포켓몬과 만나게 됩니다. 야생 포켓몬의 행동을 관찰하고, 그에 맞는 전략을 짜서 포획하거나 배틀에 도전해보세요." color="#A8D08B" />
          <LineEle date="2021.11" icon={<BsNintendoSwitch />} tit="포켓몬스터 브릴리언트 다이아몬드·샤이닝 펄" tit2="포켓몬스터 시리즈 25주년 기념 4세대 리메이크" p="원작의 다양한 플레이 요소가 닌텐도 스위치에서 화려하게 재탄생했습니다. 원작을 해보신 분도, 처음 접하시는 분도 정겹고도 새로운 모험을 즐기실 수 있습니다." color="#D06991" />
          <LineEle date="2019.11" icon={<BsNintendoSwitch />} tit="포켓몬스터 소드·실드" tit2="새로운 진화 시스템 '다이맥스' 도입" p="최초로 DLC를 판매한 작품으로, 전작에 비해 화려해진 그래픽과 모션이 특징입니다. 온화한 전원 풍경, 근대적인 도시, 험준한 설산 등 다양한 환경을 모험해보세요." color="rgb(33, 150, 243)" />
          <LineEle date="2018.11" icon={<BsNintendoSwitch />} tit="포켓몬스터 레츠고! 피카츄·레츠고! 이브이" tit2="1세대 피카츄 리메이크" p="" color="#8F5735" />
          <LineEle date="2017.11" icon={<SiNintendo3Ds />} tit="포켓몬스터 울트라썬·울트라문" tit2="포켓몬스터 썬·문 확장판" p="" color="#FF6A00" />
          <LineEle date="2016.11" icon={<SiNintendo3Ds />} tit="포켓몬스터 썬·문" tit2="포켓몬스터 시리즈 20주년 기념 작품" p="4개의 섬과 1개의 인공섬으로 이루어진 알로라 지방에는 지금까지 본 적이 없는 다양한 포켓몬들이 서식하고 있습니다. 몬스터볼로 포켓몬을 잡고 전 세계의 친구들과 포켓몬 대전이나 교환을 해보세요." color="#352474" />
          <LineEle date="2014.11" icon={<SiNintendo3Ds />} tit="포켓몬스터 오메가루비·알파사파이어" tit2="3세대 루비·사파이어 리메이크" p="새로운 시스템 '창공날기'로 광대한 호연지방을 날아다니며 메가진화의 수수께끼를 찾는 모험이 펼쳐집니다." color="#F1A142" />
          <LineEle date="2013.10" icon={<SiNintendo3Ds />} tit="포켓몬스터 X·Y" tit2="최초의 3D 모델링 적용 작품" p="새로운 포켓몬 타입 '페어리'가 등장합니다. 여러마리의 포켓몬과 동시에 배틀하는 '무리 배틀', 화려한 공중전 '스카이 배틀' 등 박력 있는 시스템과 함께하는 새로운 차원의 포켓몬 게임입니다." color="#A8D08B" />
          <LineEle date="2012.6" icon={<SiNintendo3Ds />} tit="포켓몬스터 블랙·화이트2" tit2="포켓몬스터 블랙·화이트로부터 2년 후의 이야기" p="최초로 후속작을 표방하여 넘버링이 붙은 작품입니다. 같은 하나 지방에서 펼쳐지는 또다른 이야기가 당신을 기다립니다." color="black" />
          <LineEle date="2010.9" icon={<SiNintendo3Ds />} tit="포켓몬스터 블랙·화이트" tit2="" p="녹음으로 둘러싸여 있으면서도 근대적인 대도시가 존재하는 하나지방이 이번 모험의 무대입니다. 다양한 시간과 장소에서 많은 포켓몬을 만날 수 있습니다." color="#666" />
        </VerticalTimeline>
      </section>
    </Layout>
  );
}
