import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBoughtCoin, reset } from "../../features/auth/authSlice";
import Visualizer from "../Visualizer/Visualizer";

const CryptoRow = ({
  coinId,
  icon,
  name,
  change,
  rank,
  priceBought,
  currPrice,
  amount,
  value,
}) => {
  const [isBought, setIsBought] = useState(true);
  const dispatch = useDispatch();
  const handleDeleteBought = () => {
    dispatch(deleteBoughtCoin({ coinId: coinId }));
    setIsBought(false);
  };
  return (
    <>
      {isBought ? (
        <div className="crypto_row-box">
          <p>{rank}</p>
          <img src={icon} alt="coin icon" className="coin_img" />
          <p>{name}</p>
          <Visualizer change={change} />
          <p>{priceBought}</p>
          <p>{currPrice}</p>
          <p>{amount}</p>
          <p>{value}</p>
          <button className="delete-btn" onClick={() => handleDeleteBought()}>
            X
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CryptoRow;
