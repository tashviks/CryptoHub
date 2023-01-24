import React, { useState, useEffect } from "react";
import millify from "millify";
import { Line } from "react-chartjs-2";
import "./LineChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ coinHistory, simplified }) => {
  const coinPrice = [];
  const coinTimestamps = [];

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinTimestamps.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      })
    );
  }

  const origin = coinPrice[0];
  const [isIncreased, setIsIncreased] = useState(true);
  useEffect(() => {
    setIsIncreased(
      coinPrice[0] < coinPrice[coinHistory?.data?.history?.length - 1]
        ? true
        : false
    );
  }, [coinPrice]);

  const data2 = {
    labels: coinTimestamps,
    datasets: [
      {
        data: coinPrice,
        fill: {
          target: { value: origin },
          above: "rgba(123, 255, 0, 0.2)",
          below: "rgba(255, 50, 57, 0.2)",
        },
        backgroundColor: "rgba(123, 255, 0, 0.0)",
        borderColor: isIncreased
          ? "rgba(191, 255, 30, 0.5)"
          : "rgba(255, 0, 85, 0.5)",
        borderWidth: simplified ? 1 : 3,
        pointRadius: simplified ? 0 : 10,
        pointBorderColor: "rgba(255, 255, 255, 0)",
        pointColor: "rgba(255, 255, 255, 0)",
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    scales: {
      y: {
        display: simplified ? false : true,
        position: "right",
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            family: "DM Sans",
            size: 12,
          },
        },
      },
      x: {
        display: simplified ? false : true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 7,
          callback: function (val, index) {
            return index % 2 === 0 ? this.getLabelForValue(val) : "";
          },
          font: {
            family: "DM Sans",
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: '"DM Sans", sans-serif',
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  const [changeClass, setChangeClass] = useState("neutr");

  useEffect(() => {
    if (parseInt(coinHistory?.data?.change) >= 1) setChangeClass("posit");
    else if (parseInt(coinHistory?.data?.change) <= -1) setChangeClass("negat");
    else setChangeClass("neutr");
  }, [coinHistory?.data?.change]);

  return <Line data={data2} options={options} className="chart" id="chart" />;
};

export default LineChart;
