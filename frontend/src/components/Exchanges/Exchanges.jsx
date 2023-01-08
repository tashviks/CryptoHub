import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

import { useGetExchangesQuery } from "../../services/cryptoExchangesApi";

import { IoMdClose } from "react-icons/io";
import "./Exchanges.scss";

const Exchanges = ({ simplified }) => {
  const count = simplified ? 5 : 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [exchanges, setExchanges] = useState();
  const { data: exchangesList, isFetching } = useGetExchangesQuery(count);

  useEffect(() => {
    setExchanges(exchangesList);
    const filteredData = exchangesList?.filter((exch) =>
      exch.id.includes(searchTerm)
    );
    setExchanges(filteredData);
  }, [exchangesList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <section className="exchanges_section">
      <div className="container">
        <div className="exchanges_wrapper wrapper">
          {simplified ? (
            <div className="title">
              <h4>Top 5 Exchanges</h4>
              <Link to="/exchanges">More</Link>
            </div>
          ) : null}
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
          {exchanges && (
            <div className="wrapper exchanges_accord_wrapper">
              {exchanges?.slice(0, count).map((item, ind) => {
                return (
                  <Accordion
                    rank={item.trust_score_rank}
                    title={item.name}
                    content={item}
                    key={ind}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Exchanges;
