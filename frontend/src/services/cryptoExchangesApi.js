import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchApiHeaders = {
  'X-RapidAPI-Key': '9c4682bc6emsh0b95b65b2f37b64p1588ccjsn489b57e43ec2',
  'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseUrl = 'https://coingecko.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoExchApiHeaders })

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`)
    })
  })
})

export const {
  useGetExchangesQuery
} = cryptoExchangesApi