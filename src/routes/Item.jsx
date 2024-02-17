import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";

export default function Item() {
  const location = useLocation();
  const { tit, content, time, cate, re, view } = location.state;

  return <Layout>Item</Layout>;
}
