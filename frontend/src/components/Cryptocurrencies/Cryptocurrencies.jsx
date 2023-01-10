import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CryptoCard from "./CryptoCard";
import { getTrackedCoins, reset } from "../../features/auth/authSlice";

import Loader from "../Loader/Loader";

import { IoMdClose } from "react-icons/io";
import "./Cryptocurrencies.scss";

import { useGetCryptosListQuery } from "../../services/cryptoApi";

const Items = ({ currentItems, trackedCoins }) => {
  return (
    <>
      {!currentItems ? (
        <div className="notfound-box">
          <h1>Oops! Nothing here yet...</h1>
        </div>
      ) : (
        <div className="crypto-card-box">
          {currentItems?.map((currency, index) => (
            <CryptoCard
              uuid={currency.uuid}
              rank={currency.rank}
              name={currency.name}
              iconUrl={currency.iconUrl}
              symbol={currency.symbol}
              price={currency.price}
              marketCap={currency.marketCap}
              change={currency.change}
              id={currency.uuid}
              key={index}
              tracked={
                trackedCoins.some((e) => e.coinId === currency.uuid)
                  ? true
                  : false
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

const Cryptocurrencies = ({ simplified }) => {
  const dispatch = useDispatch();
  const count = simplified ? 10 : 100;

  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 20;

  const [cryptos, setCryptos] = useState([]);
  const { data: cryptosList, isFetching } = useGetCryptosListQuery(count);

  const { trackedCoins } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTrackedCoins());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins?.filter(
      (coin) =>
        coin.name.toLocaleLowerCase().includes(searchTerm) ||
        coin.symbol.toLocaleLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [searchTerm, cryptosList?.data?.coins]);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
  }, [cryptosList]);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  let currentItems;
  let pageCount;
  if (cryptos) {
    currentItems = cryptos.slice(itemOffset, endOffset);
    pageCount = Math.ceil(cryptos.length / itemsPerPage);
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cryptos.length;
    setItemOffset(newOffset);
  };

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <section className="search-box">
          <div className="container">
            <div className="wrapper hor">
              <input
                type="text"
                placeholder="Search cryptos"
                className="search-bar"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value.toLocaleLowerCase())
                }
              />
              <button
                className="clear-btn"
                onClick={() => {
                  setSearchTerm("");
                }}
              >
                <IoMdClose />
              </button>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <div className="wrapper">
            {!simplified ? (
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-nav prev"
                nextClassName="page-item"
                nextLinkClassName="page-nav next"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            ) : (
              <div className="title">
                <h4>Top 10 Cryptos</h4>
                <Link to="/currencies">More</Link>
              </div>
            )}

            <Items
              currentItems={currentItems}
              count={count}
              searchTerm={searchTerm}
              trackedCoins={trackedCoins}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Cryptocurrencies;
