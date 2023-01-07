import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'

const CryptoCard = ({ uuid, rank, name, iconUrl, symbol, price, marketCap, change }) => {

  const [changeClass, setChangeClass] = useState('neutr')

  useEffect(() => {
    if (parseInt(change) >= 1) setChangeClass('posit')
    else if (parseInt(change) <= -1) setChangeClass('negat')
    else setChangeClass('neutr')
  }, [])

  return (
    <div className='crypto-container'>
      <Link to={`/crypto/${uuid}`} key={uuid}>
        <div className="crypto-card-wrap">
          <div className="crypto-card">
            <div className="crypto-card-heading">
              <h3>
                {rank}. <font>{name}</font> 
              </h3>
              <img src={iconUrl} alt="coin icon" />
            </div>
            <p>{symbol}</p>
            <p >Price: ${millify(price, {precision: 3})}</p>
            <p>Market Cap: {millify(marketCap)}</p>
            <p>Daily Change: <font className={changeClass}>{millify(change)}%</font></p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CryptoCard