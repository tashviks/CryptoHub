import React, { useState } from 'react'
import millify from 'millify'

import { LeftOutlined } from '@ant-design/icons'

const btcImgUrl = 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg'

const Accordion = ({rank, title, content}) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <div className={!isActive ? "accord-box" : "accord-box active"} onClick={() => setIsActive(!isActive)}>
      <div className={!isActive ? "accord-heading" : "accord-heading active"}>
        <h4 className='accord-title'>{rank}. <img src={content.image} alt="exchange icon" /> {title}</h4>
        <h4><img src={btcImgUrl} alt="bitcoin logo"/> {millify(content.trade_volume_24h_btc)}</h4>
        <LeftOutlined className={isActive ? "arrow active" : "arrow"} />
      </div>
      <div className={!isActive ? "accord-content-box" : "accord-content-box active"}>
      <div className="accord-content">
        <p><i>Website:</i> <a href={content.url}>{content.url}</a></p>
        {content.year_established && <p><i>Established:</i> {content.year_established}</p>}
        {content.country && <p> <i>Country:</i> {content.country}</p>}
        {content.description && 
          <p>{content.description.length > 500 ? <><i>Description:</i> {content.description.substring(0, 500)}...</> : <><i>Description:</i> {content.description}</>}</p>
        }
      </div>
      </div>
    </div>
  )
}

export default Accordion