import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import Loader from "../Loader/Loader";

import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";

import "./News.css";

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(count);

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (isFetching) return <Loader />;

  return (
    <section className="news_section">
      <div className="container">
        <div className="news_wrapper wrapper ver">
          <div className="title">
            <h4>Freshest News</h4>
            <Link to="/news">More</Link>
          </div>
          {!simplified && <h1>Freshest Crypto News</h1>}
          <div className="crypto-news-box">
            {cryptoNews.value.map((news, i) => (
              <a href={news.url}>
                <div className="crypto-news-card" key={i}>
                  <div className="news-card-heading">
                    <h3>{news?.name}</h3>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="news thumbnail"
                    />
                  </div>
                  <p className="news-card-desc">
                    {news.description.length > 100
                      ? `${news.description.substring(0, 150)}...`
                      : news.description}
                  </p>
                  <div className="news-card-src">
                    <p className="src-name">
                      {news.provider[0]?.name}
                      {news.provider[0]?.image?.thumbnail?.contentUrl && (
                        <img
                          src={news.provider[0]?.image?.thumbnail?.contentUrl}
                          alt="source thumbnail"
                        />
                      )}
                    </p>
                    <p className="news-card-date">
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
