import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': 'e9c20ff7a2msh58affd29d73e02ap11b67ejsn2e3f34bd3e80'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getGlobals: builder.query({
      query: () => createRequest('/stats')
    }),
    getCryptosList: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
    })
  })
})

export const {
  useGetGlobalsQuery,
  useGetCryptosListQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} = cryptoApi