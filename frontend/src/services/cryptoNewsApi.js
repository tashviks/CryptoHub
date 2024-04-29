import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '9c4682bc6emsh0b95b65b2f37b64p1588ccjsn489b57e43ec2',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/'

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/news/search?q=crypto&qs=n&form=QBNT&sp=-1&lq=0&pq=crypt&sc=10-5&sk=&cvid=CC823557135B4362AF39810E367008C4&ghsh=0&ghacc=0&ghpl=`)
    })
  })
})

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi