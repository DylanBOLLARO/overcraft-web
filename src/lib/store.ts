import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/auth'
import authReducer from './features/auth/authSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            auth: authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']