import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Globals from "../components/Globals/Globals";
import Cryptocurrencies from "../components/Cryptocurrencies/Cryptocurrencies";
import Exchanges from "../components/Exchanges/Exchanges";
import News from "../components/News/News";
import MainCharts from "../components/MainCharts/MainCharts";

const HomePage = () => {
  return (
    <main className="home-page page">
      <Hero />
      <Features />
      <MainCharts />
      <Globals />
      <Exchanges simplified />
      <Cryptocurrencies simplified />
      <News simplified />
    </main>
  );
};

export default HomePage;
