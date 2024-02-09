import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

export default function Pokemon() {
  const { id } = useParams();
  console.log(id);
  return <Layout>Pokemon</Layout>;
}
