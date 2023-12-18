import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    value: any
}

const initialState = { value: [] } as CounterState

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value = action.payload
        },
    },
})

export const { incrementByAmount } = counterSlice.actions
export default counterSlice.reducer