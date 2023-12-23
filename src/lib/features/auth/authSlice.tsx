import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const slice = createSlice({
	name: "auth",
	initialState: { user: null, tokens: null },
	reducers: {
		setCredentials: (state, { payload: { user, tokens } }) => {
			state.user = user;
			state.tokens = tokens;
		},
	},
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentTokens = (state: RootState) => state.auth.tokens;
