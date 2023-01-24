import React from "react";

import News from "../components/News/News";

const NewsPage = () => {
  return (
    <div className="news-page page">
      <h1 className="page_title">Fresh Crypto News</h1>
      <News />
    </div>
  );
};

export default NewsPage;
