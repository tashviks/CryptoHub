import React, {useState, useEffect} from 'react';
import millify from 'millify';
import { Line } from 'react-chartjs-2';
import './LineChart.css'
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);


const LineChart = ({ coinHistory, currentPrice, coinName, simplified }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0 ; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0 ; i -= 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const origin = coinPrice[0]
  const [isIncreased, setIsIncreased] = useState(true)
  useEffect(() => {
    setIsIncreased(coinPrice[0] < coinPrice[coinHistory?.data?.history?.length - 1] ? true : false)
  }, [coinPrice])

  const data2 = {
    labels: coinTimestamp,
    datasets: [
      {
        data: coinPrice,
        fill: {
          target: {value: origin},
          above: 'rgba(123, 255, 0, 0.2)',   
          below: 'rgba(255, 50, 57, 0.2)'
        },
        backgroundColor: isIncreased ? 'rgba(123, 255, 0, 0.2)' : 'rgba(255, 0, 85, 0.2)',
        borderColor: isIncreased ? 'rgba(191, 255, 30, 0.5)' : 'rgba(255, 0, 85, 0.5)',
        borderWidth: simplified ? 1 : 3,
        pointRadius: simplified ? 0 : 1,
        tension: 0.5
      },
    ],
  };
  
  const options = {
    responsive: true,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    scales: {
      y: {
        display: simplified ? false : true,
        grid: {
          color: 'rgba(255, 255, 255, 0)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      x: {
        display: simplified ? false : true,
        grid: {
          color: 'rgba(255, 255, 255, 0)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
  };

  const [changeClass, setChangeClass] = useState('neutr')

  useEffect(() => {
    if (parseInt(coinHistory?.data?.change) >= 1) setChangeClass('posit')
    else if (parseInt(coinHistory?.data?.change) <= -1) setChangeClass('negat')
    else setChangeClass('neutr')
  }, [coinHistory?.data?.change])

  return (
    <>
      {!simplified && 
        <div className="chart-header">
          <div className="price-container">
            <h5 className="price-change">Change: <font className={changeClass}>{coinHistory?.data?.change}%</font></h5>
            <h5 className="current-price">{coinName} Price: $ {millify(currentPrice, {precision: 3})}</h5>
          </div>
        </div>
      }
      <Line data={data2} options={options} className='chart' id='chart'/>
    </>
  );
};

export default LineChart;