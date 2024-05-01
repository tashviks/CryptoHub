import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBoughtCoin, reset } from "../../features/auth/authSlice";
import Visualizer from "../Visualizer/Visualizer";
import { DeleteOutlined } from "@ant-design/icons";

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
          <div className="row_name">
            {rank}. <img src={icon} alt="coin icon" className="coin_img" />
            {name}
          </div>
          <div>
            <Visualizer
              change={((currPrice - priceBought) * 100) / priceBought}
            />
          </div>
          <div>{priceBought.toFixed(2)}</div>
          <div>{currPrice.toFixed(2)}</div>
          <div>{amount}</div>
          <div>{value.toFixed(2)}</div>
          <div>{(amount * currPrice).toFixed(2)}</div>
          <button className="delete-btn" onClick={() => handleDeleteBought()}>
            <DeleteOutlined />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CryptoRow;
