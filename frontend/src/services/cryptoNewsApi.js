import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': 'e9c20ff7a2msh58affd29d73e02ap11b67ejsn2e3f34bd3e80'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
})

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi