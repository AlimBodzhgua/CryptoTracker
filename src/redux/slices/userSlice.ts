import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import {
    signUpUser,
    signInUser,
    signOutUser,
    resetUserPassword,
    signInWithGoogle,
    updateUserProfile,
} from '../actions/userActions';

export interface UserStateSchema {
	isLoading: boolean;
	error?: string;
	_mounted: boolean;

	authData: IUser | null;
}

const initialState:UserStateSchema = {
    isLoading: false,
    error: undefined,
    authData: null,
    _mounted: false,
};

export const userSlice = createSlice({
    name: 'userSLice',
    initialState,
    reducers: {
    	initAuthData: (state, action: PayloadAction<string | null>) => {
    		if (action.payload) {
	    		state.authData = JSON.parse(action.payload);
    		}
    		state._mounted = true;
    	},
    	changeUserImageUrl: (state, action: PayloadAction<string>) => {
    		if (state.authData) {
	    		state.authData.imageUrl = action.payload;
    		}
    	},
    	changeUserLogin: (state, action: PayloadAction<string>) => {
    		if (state.authData) {
	    		state.authData.login = action.payload;
    		}
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
	    	})
	    	// SignInWithGoogle
	    	.addCase(signInWithGoogle.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(signInWithGoogle.fulfilled, (state, action) => {
	    		state.isLoading = false;
	    		state.authData = action.payload;
	    	})
	    	.addCase(signInWithGoogle.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// UpdateUserProfile
	    	.addCase(updateUserProfile.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(updateUserProfile.fulfilled, (state, action) => {
	    		if (state.authData) {
		    		state.authData.imageUrl = action.payload.imageUrl;
		    		state.authData.login = action.payload.login;
	    		}
	    		state.isLoading = false;
	    	})
	    	.addCase(updateUserProfile.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	});
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
