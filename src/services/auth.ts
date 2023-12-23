import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../lib/store'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.tokens
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { useLoginMutation } = api
