import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTrackedCoin, trackCoin } from "../../features/auth/authSlice";

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
  isTracked,
}) => {
  console.log(isTracked);
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [changeClass, setChangeClass] = useState("");

  useEffect(() => {
    if (parseFloat(change) > 0) setChangeClass("posit");
    else if (parseFloat(change) < 0) setChangeClass("negat");
    else if (parseFloat(change) === 0) setChangeClass("neutr");
  }, [change]);

  const handleTrack = () => {
    dispatch(trackCoin({ coinId: uuid }));
  };

  const handleDeleteTracked = () => {
    dispatch(deleteTrackedCoin({ coinId: uuid }));
  };

  return (
    <div className="crypto-container">
      <Link to={`/crypto/${uuid}`} key={uuid}>
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
              Daily Change:{" "}
              <font className={changeClass}>
                {parseFloat(change)}%
                {parseFloat(change) > 0 ? <UpOutlined /> : <DownOutlined />}{" "}
              </font>
            </p>
          </div>
        </div>
      </Link>
      {isTracked ? (
        <button className="track-btn" onClick={() => handleDeleteTracked()}>
          tracked
        </button>
      ) : (
        <button className="track-btn" onClick={() => handleTrack()}>
          not tracked
        </button>
      )}
    </div>
  );
};

export default CryptoCard;
