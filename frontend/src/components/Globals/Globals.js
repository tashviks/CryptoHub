import React from "react";
import { Link } from "react-router-dom";
import { useGetGlobalsQuery } from "../../services/cryptoApi";
import PieChart from "../PieChart/PieChart";
import Loader from "../Loader/Loader";
import millify from "millify";

import {
  PieChartOutlined,
  DollarOutlined,
  FundOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import "./Globals.css";

function Globals() {
  const { data, isFetching } = useGetGlobalsQuery();

  if (isFetching) return <Loader />;

  return (
    <section className="globals">
      <div className="container">
        <div className="globals_wrapper wrapper hor">
          <div className="globals-box">
            <div className="globals-chart">
              <PieChart share={data?.data?.btcDominance} />
            </div>
            <div className="globals-content">
              <h3 className="globals-heading">
                <PieChartOutlined /> <font id="btc">BTC</font> market share:{" "}
                <font>{millify(data?.data?.btcDominance)}%</font>
              </h3>
              <h3 className="globals-heading">
                <DollarOutlined /> Total coins:{" "}
                <font>{millify(data?.data?.totalCoins)}</font>
              </h3>
              <h3 className="globals-heading">
                <FundOutlined /> Total markets:{" "}
                <font>{millify(data?.data?.totalMarkets)}</font>
              </h3>
              <h3 className="globals-heading">
                <MoneyCollectOutlined /> Market cap:{" "}
                <font>${millify(data?.data?.totalMarketCap)}</font>
              </h3>
              <h3 className="globals-heading">
                <DollarOutlined /> Traded in 24h:{" "}
                <font>${millify(data?.data?.total24hVolume)}</font>
              </h3>
            </div>
          </div>
          <div className="globals-info">
            <h4 className="title">Global Stats</h4>
            <h2>Look out for global crypto stats</h2>
            <p>
              Global Crypto Stats are always worth looking out for! Watch the
              Bitcoin dominance closely: when it rises, the altcoins go down,
              and vice versa. Other than that, the global coins traded might be
              of interest to you.
            </p>
            <button className="btn-pink-solid">
              <Link to="/currencies">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Globals;
