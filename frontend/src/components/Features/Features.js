import React from "react";
import { Link } from "react-router-dom";
import {
  BulbOutlined,
  MoneyCollectOutlined,
  FundOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import "./Features.scss";

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-content">
          <div className="features-info">
            <h4 className="title">Features</h4>
            <h2>Explore CryptoHub's opportunities</h2>
            <p>
              CryptoHub is the best and easiest resource for beginners; get all
              the information you need for crypto trading and be one step closer
              to your success!
            </p>
            <Link to="/currencies" className="btn-pink-solid">
              Explore
            </Link>
          </div>
          <div className="features-cards-box">
            <div className="features-card">
              <span>
                <BulbOutlined
                  style={{ fontSize: "300%", color: "rgb(173, 2, 167)" }}
                />
              </span>
              <h3>News</h3>
              <p>
                Check out the latest news of crypto market from experts and
                reputable sources
              </p>
            </div>
            <div className="features-card">
              <span>
                <MoneyCollectOutlined
                  style={{ fontSize: "300%", color: "rgb(173, 2, 167)" }}
                />
              </span>
              <h3>Coins</h3>
              <p>Find out today's most prominent cryptocurrencies</p>
            </div>
            <div className="features-card">
              <span>
                <GlobalOutlined
                  style={{ fontSize: "300%", color: "rgb(173, 2, 167)" }}
                />
              </span>
              <h3>Exchanges</h3>
              <p>
                Check out the exchange markets, their background and useful
                links
              </p>
            </div>
            <div className="features-card">
              <span>
                <FundOutlined
                  style={{ fontSize: "300%", color: "rgb(173, 2, 167)" }}
                />
              </span>
              <h3>Historic Prices</h3>
              <p>
                Find out the price history of any coin with our custom charts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
