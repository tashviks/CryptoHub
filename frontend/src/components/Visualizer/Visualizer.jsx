import React, { useState, useEffect } from "react";

import "./Visualizer.scss";

import { UpOutlined, DownOutlined } from "@ant-design/icons";

const Visualizer = ({ change }) => {
  const [changeClass, setChangeClass] = useState("");
  useEffect(() => {
    if (parseFloat(change) > 0) setChangeClass("posit");
    else if (parseFloat(change) < 0) setChangeClass("negat");
    else if (parseFloat(change) === 0) setChangeClass("neutr");
  }, [change]);

  return (
    <font className={changeClass}>
      <span className="float">
        {parseFloat(change) > 0 ? <UpOutlined /> : <DownOutlined />}{" "}
      </span>
      {parseFloat(change)}%
    </font>
  );
};

export default Visualizer;
