import React from 'react'

import Cryptocurrencies from '../components/Cryptocurrencies/Cryptocurrencies'



const CurrenciesPage = () => {

  return (
    <div className='currencies-page page'>
      <h1  className='page_title'>Top 100 Cryptos</h1>
      <Cryptocurrencies />
    </div>
  )
}

export default CurrenciesPage