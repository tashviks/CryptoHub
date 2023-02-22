import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { useDispatch } from "react-redux";
import {
  deleteTrackedCoin,
  trackCoin,
  getTrackedCoins,
  reset,
} from "../../features/auth/authSlice";

import { UpOutlined, DownOutlined, HeartFilled } from "@ant-design/icons";

const CryptoCard = ({
  uuid,
  rank,
  name,
  iconUrl,
  symbol,
  price,
  marketCap,
  change,
  tracked,
}) => {
  const dispatch = useDispatch();
  const [changeClass, setChangeClass] = useState("");

  useEffect(() => {
    if (parseFloat(change) > 0) setChangeClass("posit");
    else if (parseFloat(change) < 0) setChangeClass("negat");
    else if (parseFloat(change) === 0) setChangeClass("neutr");
  }, [change]);

  useEffect(() => {
    dispatch(getTrackedCoins());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleTrack = () => {
    dispatch(trackCoin({ coinId: uuid }));
    setIsTracked(true);
  };

  const handleDeleteTracked = () => {
    dispatch(deleteTrackedCoin({ coinId: uuid }));
    setIsTracked(false);
  };

  const [isTracked, setIsTracked] = useState();
  useEffect(() => {
    setIsTracked(tracked);
  }, [tracked]);
  const [press, setPress] = useState(false);

  return (
    <div className="crypto-box">
      <div
        className={`crypto-container ${press ? "press" : ""}`}
        onClick={() => setPress(true)}
        onTransitionEnd={() => setPress(false)}
      >
        <Link to={`/crypto/${uuid}`} key={uuid} className="crypto-link">
          <div className="crypto-card-wrap">
            <div className="crypto-card">
              <div className="crypto-card-heading">
                <h3>
                  {rank}. <font>{name}</font>
                </h3>
                <img src={iconUrl} alt="coin icon" />
              </div>
              <p>{symbol}</p>
              <p>Price: ${millify(price, { precision: 3 })}</p>
              <p>Market Cap: {millify(marketCap)}</p>
              <p>
                24h:{" "}
                <font className={changeClass}>
                  {parseFloat(change)}%
                  {parseFloat(change) > 0 ? <UpOutlined /> : <DownOutlined />}{" "}
                </font>
              </p>
            </div>
          </div>
        </Link>
        {isTracked ? (
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
      </div>
    </div>
  );
};

export default CryptoCard;
