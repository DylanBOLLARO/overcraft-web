import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import authReducer from './authSlice'
import { persistReducer } from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import counterSlice from './counterSlice';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterSlice,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(apiSlice.middleware),
        devTools: true,
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']