import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Interweave } from "interweave";
import LineChart from "../LineChart/LineChart";
import Loader from "../Loader/Loader";

import { HeartFilled } from "@ant-design/icons";

import {
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
} from "../../services/cryptoApi";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import "./CryptoDetails.scss";
import Visualizer from "../Visualizer/Visualizer";
import { useSelector, useDispatch } from "react-redux";
import {
  checkTrackedCoin,
  reset,
  deleteTrackedCoin,
  trackCoin,
} from "../../features/auth/authSlice";

const CryptoDetails = () => {
  const dispatch = useDispatch();

  const { isTracked } = useSelector((state) => state.auth);
  console.log(isTracked);
  const { coinId } = useParams();

  useEffect(() => {
    dispatch(checkTrackedCoin(coinId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, coinId]);

  const [tracked, setTracked] = useState(isTracked);

  const handleTrack = () => {
    dispatch(trackCoin({ coinId: coinId }));
    setTracked(true);
  };

  const handleDeleteTracked = () => {
    dispatch(deleteTrackedCoin({ coinId: coinId }));
    setTracked(false);
  };

  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price, 3)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "Daily Change",
      value: (
        <Visualizer
          change={cryptoDetails?.change && millify(cryptoDetails?.change, 3)}
        />
      ),
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap, 3)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high (daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price, 3)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total, 6)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating, 3)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="details-page">
      <section className="chart_section">
        <div className="container">
          <div className="chart_wrapper wrapper hor">
            <div className="chart_details-box dark_card">
              <div className="details-stats">
                <div className="stats-heading">
                  <div className="details_title">
                    <img
                      src={cryptoDetails.iconUrl}
                      alt=""
                      className="details_icon"
                    />
                    {cryptoDetails.name} Value Statistics
                  </div>
                  <p>An overview showing the stats of {cryptoDetails.name}</p>
                </div>
                {tracked ? (
                  <button
                    className="track-btn active"
                    onClick={() => handleDeleteTracked()}
                  >
                    <HeartFilled />
                  </button>
                ) : (
                  <button className="track-btn" onClick={() => handleTrack()}>
                    <HeartFilled />
                  </button>
                )}
                {stats.map(({ icon, title, value }, index) => {
                  return (
                    <div className="coin-stats_row" key={index}>
                      <div className="coin-stats-name">
                        {icon}
                        <h4>{title}</h4>
                      </div>
                      <h2>{value}</h2>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="chart_box dark_card">
              <div className="chart_top">
                <div className="select">
                  <label htmlFor="timeperiod">Period: </label>
                  <select
                    defaultValue="7d"
                    name="timeperiod"
                    id="time"
                    onChange={(e) => setTimeperiod(e.target.value)}
                  >
                    {time.map((date) => (
                      <option key={date}>{date}</option>
                    ))}
                  </select>
                </div>
                <div className="price-change">
                  Change: <Visualizer change={coinHistory?.data?.change} />
                </div>
              </div>
              <LineChart
                coinHistory={coinHistory}
                currentPrice={cryptoDetails?.price}
                coinName={cryptoDetails?.name}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="stats_section">
        <div className="container">
          <div className="stats-box">
            <div className="details-stats">
              <div className="stats-heading">
                <h3>{cryptoDetails.name} Value Statistics</h3>
                <p>An overview showing the stats of {cryptoDetails.name}</p>
              </div>
              {stats.map(({ icon, title, value }, index) => {
                return (
                  <div className="coin-stats" key={index}>
                    <div className="coin-stats-name">
                      <p>{icon}</p>
                      <h4>{title}</h4>
                    </div>
                    <h2>{value}</h2>
                  </div>
                );
              })}
            </div>

            <div className="other-stats">
              <div className="stats-heading">
                <h3>Other Statistics</h3>
                <p>Other values</p>
              </div>
              {genericStats.map(({ icon, title, value }, index) => {
                return (
                  <div className="coin-stats" key={index}>
                    <div className="coin-stats-name">
                      <p>{icon}</p>
                      <h4>{title}</h4>
                    </div>
                    <h2>{value}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="details-desc">
        <div className="container">
          <div className="details_wrapper wrapper hor">
            <div className="desc">
              <h2>
                What is{" "}
                <img
                  src={cryptoDetails?.iconUrl}
                  alt="coin icon"
                  className="icon"
                />
                {cryptoDetails.name}?
              </h2>
              <Interweave
                content={cryptoDetails.description}
                className="coin-desc"
              />
            </div>

            <div className="coin-links dark_card">
              <h2>Links</h2>
              {cryptoDetails?.links?.map((link, index) => {
                return (
                  <div className="coin-link" key={index}>
                    <h4>{link.type}</h4>
                    <a href={link.url}>{link.name}</a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CryptoDetails;
