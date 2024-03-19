import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import {
    signUpUser,
    signInUser,
    signOutUser,
    resetUserPassword,
} from '../actions/userActions';

export interface UserStateSchema {
	isLoading: boolean;
	error?: string;
	authData: IUser | null;
}

const initialState:UserStateSchema = {
    isLoading: false,
    error: undefined,
    authData: null,
};

export const userSlice = createSlice({
    name: 'userSLice',
    initialState,
    reducers: {
    	initAuthData: (state, action: PayloadAction<IUser>) => {
    		state.authData = action.payload;
    	},
    },
    extraReducers: (builder) => {
    	builder
    		// SignUpUser
	    	.addCase(signUpUser.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(signUpUser.fulfilled, (state, action) => {
	    		state.authData = action.payload;
	    		state.isLoading = false;
	    	})
	    	.addCase(signUpUser.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// SignInUser
	    	.addCase(signInUser.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(signInUser.fulfilled, (state, action) => {
	    		state.authData = action.payload;
	    		state.isLoading = false;
	    	})
	    	.addCase(signInUser.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// SignOutUser
	    	.addCase(signOutUser.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(signOutUser.fulfilled, (state, action) => {
	    		state.authData = null;
	    		state.isLoading = false;
	    	})
	    	.addCase(signOutUser.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// ResetPassword
	    	.addCase(resetUserPassword.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(resetUserPassword.fulfilled, (state) => {
	    		state.isLoading = false;
	    	})
	    	.addCase(resetUserPassword.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	});
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
