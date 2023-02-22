import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoCard from "../components/Cryptocurrencies/CryptoCard";
import CryptoRow from "../components/Cryptocurrencies/CryptoRow";
import {
  getBoughtCoins,
  getTrackedCoins,
  reset,
} from "../features/auth/authSlice";
import { useGetCryptosListQuery } from "../services/cryptoApi";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currTab, setCurrTab] = useState(0);

  const { user, trackedCoins, boughtCoins } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getTrackedCoins());
    dispatch(getBoughtCoins());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const { data: cryptosList, isFetching } = useGetCryptosListQuery(100);

  let coinsToDisplay = [];
  let boughtCoinsToDisplay = [];
  boughtCoins.map(
    (coin, i) =>
      (boughtCoinsToDisplay[i] = {
        coinId: coin.coinId,
        icon: cryptosList?.data.coins.find((el) => el.uuid === coin.coinId)
          .iconUrl,
        name: cryptosList?.data.coins.find((el) => el.uuid === coin.coinId)
          .name,
        change: cryptosList?.data.coins.find((el) => el.uuid === coin.coinId)
          .change,
        rank: cryptosList?.data.coins.find((el) => el.uuid === coin.coinId)
          .rank,
        currPrice: parseFloat(
          cryptosList?.data.coins.find((el) => el.uuid === coin.coinId).price
        ),
        priceBought: coin.priceBought,
        amount: coin.amount,
        value: coin.value,
      })
  );
  trackedCoins.map((coin, i) => (coinsToDisplay[i] = coin.coinId));
  console.log(boughtCoinsToDisplay);

  return (
    <div className="news-page page">
      <div className="tab_btns-box">
        <button className="tab_btn" onClick={() => setCurrTab(0)}>
          Watchlist
        </button>
        <button className="tab_btn" onClick={() => setCurrTab(1)}>
          Portfolio
        </button>
      </div>
      {currTab === 0 ? (
        <div className="tab watchlist_tab">
          {cryptosList?.data?.coins
            ?.filter((coin) => coinsToDisplay.includes(coin.uuid))
            .map((coin, index) => {
              return (
                <CryptoCard
                  uuid={coin.uuid}
                  rank={coin.rank}
                  name={coin.name}
                  iconUrl={coin.iconUrl}
                  symbol={coin.symbol}
                  price={coin.price}
                  marketCap={coin.marketCap}
                  change={coin.change}
                  id={coin.uuid}
                  key={index}
                  tracked={true}
                />
              );
            })}
        </div>
      ) : (
        <div className="tab portfolio_tab">
          <div className="total-box"></div>
          {boughtCoinsToDisplay.length === 0 ? (
            <h1>Oops! Nothing here yet!</h1>
          ) : null}
          {boughtCoinsToDisplay.map((coin, index) => {
            return (
              <CryptoRow
                coinId={coin.coinId}
                icon={coin.icon}
                name={coin.name}
                change={coin.change}
                rank={coin.rank}
                priceBought={coin.priceBought}
                currPrice={coin.currPrice}
                amount={coin.amount}
                value={coin.value}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
