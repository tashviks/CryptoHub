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
import "./Globals.scss";

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
                <span>
                  <PieChartOutlined /> <font id="btc">BTC</font> market share:{" "}
                </span>
                <span className="value-span">
                  {millify(data?.data?.btcDominance)}%
                </span>
              </h3>
              <h3 className="globals-heading">
                <span>
                  <DollarOutlined /> Total coins:{" "}
                </span>
                <span className="value-span">
                  {millify(data?.data?.totalCoins)}
                </span>
              </h3>
              <h3 className="globals-heading">
                <span>
                  <FundOutlined /> Total markets:{" "}
                </span>
                <span className="value-span">
                  {millify(data?.data?.totalMarkets)}
                </span>
              </h3>
              <h3 className="globals-heading">
                <span>
                  <MoneyCollectOutlined /> Market cap:{" "}
                </span>
                <span className="value-span">
                  ${millify(data?.data?.totalMarketCap)}
                </span>
              </h3>
              <h3 className="globals-heading">
                <span>
                  <DollarOutlined /> Traded in 24h:{" "}
                </span>
                <span className="value-span">
                  ${millify(data?.data?.total24hVolume)}
                </span>
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
