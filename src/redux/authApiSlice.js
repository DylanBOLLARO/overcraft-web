import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice