import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../LineChart/LineChart";
import { useGetCryptoHistoryQuery } from "../../services/cryptoApi";

const SmallChart = ({ coin, coinId, symbol, imgUrl, text }) => {
  const timeperiod = "24h";
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  return (
    <div className={`main-chart_wrap ${coin}`}>
      <div className={`main-chart_card ${coin}`}>
        <div className="main-chart">
          <div className="main-chart_head">
            <Link to={`/crypto/${coinId}`}>
              <h3>
                {symbol} <img src={imgUrl} alt="coin icon" />{" "}
              </h3>
            </Link>
            <LineChart coinHistory={coinHistory} simplified />
          </div>
        </div>
        <div className="main-chart_content">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SmallChart;
