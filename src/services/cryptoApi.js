import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "568f93900amsh70cb898ae51211ap19e818jsn36e1d7d408d7",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/coins";

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});
