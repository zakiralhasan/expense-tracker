import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/' }),
    tagTypes: ['postTag', 'putTag', 'deleteTag'],
    endpoints: (builder) => ({

        getTransactions: builder.query({
            query: () => `transactions`,
            providesTags: ['postTag', 'putTag', 'deleteTag']
        }),

        postTransaction: builder.mutation({
            query: (body) => {
                return {
                    url: `transactions`,
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            },
            invalidatesTags: ['postTag']
        }),

        updateTransaction: builder.mutation({
            query: (body) => {
                const { id, data } = body
                return {
                    url: `transactions/${id}`,
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            },
            invalidatesTags: ['putTag']
        }),

        deleteTransaction: builder.mutation({
            query: (id) => {
                return {
                    url: `transactions/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['deleteTag']
        }),
    }),
})

export const { useGetTransactionsQuery, usePostTransactionMutation, useUpdateTransactionMutation, useDeleteTransactionMutation, } = transactionsApi 