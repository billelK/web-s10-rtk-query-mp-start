// create your RTK Query endpoints here
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quotesApi = createApi({
    reducerPath: "quotesApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9009/api/"}),
    tagTypes : ["quotesTag"],
    endpoints: builder => ({
        getQuotes: builder.query ({
            query: () => 'quotes',
            providesTags: ["quotesTag"]
        }),
        createQuote: builder.mutation ({
            query: quote => ({
                url: 'quotes',
                method: "POST",
                body: quote
            }),
            invalidatesTags: ["quotesTag"]

        }),
        toggleFake: builder.mutation ({
            query: quote => ({
                url: `quotes/${quote.quoteId}`,
                method: "PUT",
                body: quote.payload
            }),
            invalidatesTags: ["quotesTag"]
        }),
        deleteQuote: builder.mutation({
            query: quoteId => ({
                url: `quotes/${quoteId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["quotesTag"]
        })
    })
})

export const {
    useGetQuotesQuery,
    useCreateQuoteMutation,
    useToggleFakeMutation,
    useDeleteQuoteMutation,
} = quotesApi