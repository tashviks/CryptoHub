import React, {useEffect, useState} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './PieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const DashPieChart = ({heldCoins, invested}) => {

  const [sharesData, setSharesdata] = useState([90, 1])
  const [labelsData, setLabelsData] = useState(['a', 'b'])

  let length
  if (heldCoins) length = heldCoins.length

  useEffect(() => {
    if (heldCoins) setSharesdata(heldCoins.map(coin => (coin.sum*100)/invested))
    if (heldCoins) setLabelsData(heldCoins.map(coin => coin.symbol))
  }, [heldCoins, invested])

  let displayedShares
  let displayedLabels
  let otherShare

  if (heldCoins && sharesData) {
    if (length) {
      if (length <= 5) {
        displayedShares = sharesData.slice(0, length)
        displayedLabels = labelsData.slice(0, length)
      } 
      else {
        displayedShares = sharesData.slice(0, 5)
        if (displayedShares) {
          otherShare = 100 - displayedShares.reduce((prev, next) => prev + next)
          displayedShares.push(otherShare)
        }
        displayedLabels = labelsData.slice(0, 5)
        displayedLabels.push('Other')
      }
    }
  }
  
  const data = {
    labels: displayedLabels,
    datasets: [
      {
        label: 'Market Share',
        data: displayedShares,
        backgroundColor: [
          'rgba(234, 46, 251, 0.706)',
          'rgba(255, 32, 121, 0.725)',
          'rgb(68, 11, 212, 0.7)',
          'rgba(255, 20, 145, 0.819)',
          'rgba(117, 212, 253, 0.803)',
          'rgba(255, 255, 255, 0.3)',
        ],
        borderColor: [
          'rgba(234, 46, 251, 1)',
          'rgba(255, 32, 121, 1)',
          'rgb(68, 11, 212, 1)',
          'rgba(255, 20, 145, 1)',
          'rgba(117, 212, 253, 1)',
          'rgba(255, 255, 255, 0.8)',
        ],
        borderWidth: 2,
      },
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  }

  return (
    <>
      {
        length > 1 && <div className="dash-pie-chart"><Doughnut data={data} options={options} /></div>
      }
    </>
  )
}

export default DashPieChart