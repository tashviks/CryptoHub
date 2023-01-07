import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchApiHeaders = {
  'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
  'X-RapidAPI-Key': 'e9c20ff7a2msh58affd29d73e02ap11b67ejsn2e3f34bd3e80'
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