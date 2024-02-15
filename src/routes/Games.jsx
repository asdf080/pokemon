import React from "react";
import Layout from "../components/Layout";
import "./style/Games.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function Games() {
  return (
    <Layout>
      <section id="gamePage">
        <VerticalTimeline>
          <VerticalTimelineElement className="vertical-timeline-element--work" date="2011 - present" iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}>
            <h3 className="vertical-timeline-element-title">Creative Director</h3>
            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement className="vertical-timeline-element--work" date="2011 - present" iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}>
            <h3 className="vertical-timeline-element-title">Creative Director</h3>
            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
    </Layout>
  );
}
