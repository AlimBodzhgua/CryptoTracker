import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import { arrayMove } from '@dnd-kit/sortable';
import {
    signUpUser,
    signInUser,
    signOutUser,
    resetUserPassword,
    signInWithGoogle,
    updateUserProfile,
    addHistory,
    clearHistory,
    addWatchListCoin,
    removeWatchListCoin,
    fetchWatchListCoins,
    initUserAuth,
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
    	addWatchListCoinId: (state, action: PayloadAction<string>) => {
    		if (state.authData) {
	    		state.authData.watchList.ids.push(action.payload);
    		}
    	},
        clearError: (state) => {
            state.error = undefined;
        },
        moveWatchList: (state, action: PayloadAction<{activeId: string, overId: string}>) => {
        	if (state.authData) {
        		const watchListIds = state.authData.watchList.ids;
        		const watchListCoins = state.authData.watchList.coins;

	        	let oldIndex = watchListIds.indexOf(action.payload.activeId);
	        	let newIndex = watchListIds.indexOf(action.payload.overId);
	        	state.authData.watchList.ids = arrayMove(watchListIds, oldIndex, newIndex);

	        	oldIndex = watchListCoins.findIndex((coin) => coin.uuid === action.payload.activeId);
		        newIndex = watchListCoins.findIndex((coin) => coin.uuid === action.payload.overId);
		        state.authData.watchList.coins = arrayMove(watchListCoins, oldIndex, newIndex);
        	}
        },
    },
    extraReducers: (builder) => {
    	builder
    		// initUserAuth
	    	.addCase(initUserAuth.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(initUserAuth.fulfilled, (state, action) => {
	    		state.authData = action.payload;
	    		state.isLoading = false;
	    		state._mounted = true;
	    	})
	    	.addCase(initUserAuth.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
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
	    	})
	    	// AddHistory
	    	.addCase(addHistory.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(addHistory.fulfilled, (state, action) => {
	    		if (state.authData) {
	    			state.authData.conversionHistory!.push(action.payload);
	    		}
	    		state.isLoading = false;
	    	})
	    	.addCase(addHistory.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// ClearHistory
	    	.addCase(clearHistory.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(clearHistory.fulfilled, (state, action) => {
	    		if (state.authData) {
	    			state.authData.conversionHistory = [];
	    		}
	    		state.isLoading = false;
	    	})
	    	.addCase(clearHistory.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// addWatchListCoin
	    	.addCase(addWatchListCoin.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(addWatchListCoin.fulfilled, (state, action) => {
	    		if (state.authData) {
	    			state.authData.watchList.ids.push(action.payload);
	    		}
	    		state.isLoading = false;
	    	})
	    	.addCase(addWatchListCoin.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// removeWatchListCoins
	    	.addCase(removeWatchListCoin.pending, (state) => {
	    		state.isLoading = true;
	    	})
	    	.addCase(removeWatchListCoin.fulfilled, (state, action) => {
	    		if (state.authData) {
	    			state.authData.watchList.ids = state.authData.watchList.ids.filter((id) => (
	    				id !== action.payload
	    			));

	    			if (state.authData.watchList.coins.length) {
		    			state.authData.watchList.coins = state.authData.watchList.coins.filter((coin) => (
		    				coin.uuid !== action.payload
		    			));
	    			}
	    		}
	    		state.isLoading = false;
	    	})
	    	.addCase(removeWatchListCoin.rejected, (state, action) => {
	    		state.isLoading = false;
	    		state.error = action.payload;
	    	})
	    	// fetchWatchListCoins
            .addCase(fetchWatchListCoins.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWatchListCoins.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchWatchListCoins.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.authData) {
	                state.authData.watchList.coins = action.payload;
                }
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
