import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/cryptohub.png";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero-box">
      <div className="container">
        <div className="hero-img-box">
          <div className="hero-img-dec">
            <div className="hero-img-border">
              <div className="hero-img"></div>
              <img src={logo} alt="logo" className="hero-logo" />
            </div>
          </div>
        </div>
        <div className="hero-content-box">
          <div className="hero-content">
            <h1>Welcome to CryptoHub,</h1>
            <p>
              A resource for beginner crypto traders. Monitor current exchagne
              rates, check historic prices for fundamental analysis, read about
              exchanges and get fresh crypto news.
            </p>
            <div className="hero-btns">
              <Link to="/currencies" className="btn-pink-solid">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
