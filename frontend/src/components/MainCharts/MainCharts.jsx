import React from "react";
import SmallChart from "./SmallChart";
import "./MainCharts.scss";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MainCharts = () => {
  const btcId = "Qwsogvtv82FCd";
  const ethId = "razxDUgYGNAdQ";
  const tethId = "HIVsRcGKkPFtW";
  const btcSymbol = "BTC";
  const ethSymbol = "ETH";
  const tethSymbol = "USDT";
  const btcImgUrl = "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg";
  const ethImgUrl = "https://cdn.coinranking.com/rk4RKHOuW/eth.svg";
  const tethImgUrl = "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg";
  return (
    <section className="main-charts_section">
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            500: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="charts_slider"
        >
          <SwiperSlide>
            <SmallChart
              coin="eth"
              coinId={ethId}
              symbol={ethSymbol}
              imgUrl={ethImgUrl}
              text="Ethereum is the main altcoin! Watch it: ETH trends determines price changes in all other altcoins!"
              className="main-chart-eth"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SmallChart
              coin="btc"
              coinId={btcId}
              symbol={btcSymbol}
              imgUrl={btcImgUrl}
              text="Bitcoin is the main crypto! Watch it closely: when BTC market share hits 60%, all the altcoins will hit their bottom!"
              className="main-chart-btc"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SmallChart
              coin="teth"
              coinId={tethId}
              symbol={tethSymbol}
              imgUrl={tethImgUrl}
              text="Tehter is the main stablecoin. Those are pegged to $USD and are used for trading but be careful: they can suddenly depeg!"
              className="main-chart-teth"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default MainCharts;
