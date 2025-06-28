import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from 'shared/config/firebase/firebase';
import { createHistoryDoc, getUserDataObject } from './utils';
import { AppState } from 'app/store/config/AppState';
import { FirebaseError } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	sendEmailVerification,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import type { HistoryType, User } from './types';
import type { Coin } from 'shared/types/coin';
import coinApi from 'shared/api/coinApi';
import { userSelectors } from './userSlice';

type UserId = string;
type UserEmail = string;
type CoinUId = string;

export const initUserAuth = createAsyncThunk<User, UserId, { rejectValue: string }>(
	'user/initAuth',
	async (userId, { rejectWithValue }) => {
		try {
			const userDoc = await getDoc(doc(db, 'users', userId));
			return userDoc.data() as User;
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				return rejectWithValue(error.code);
			}
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const signUpUser = createAsyncThunk<
	User,
	Pick<User, 'email' | 'password'>,
	{ rejectValue: string }
>(
	'user/signUp',
	async (user, { rejectWithValue }) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, user.email, user.password);
			const userData = getUserDataObject(response);
			await setDoc(doc(db, 'users', response.user.uid), userData);
			return userData;
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				return rejectWithValue(error.code);
			}
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const signInUser = createAsyncThunk<
	User,
	Pick<User, 'email' | 'password'>,
	{ rejectValue: string }
>(
	'user/signIn',
	async (user, { rejectWithValue }) => {
		try {
			const response = await signInWithEmailAndPassword(auth, user.email, user.password);
			const userData = getUserDataObject(response);
			const userDoc = await getDoc(doc(db, 'users', response.user.uid));
			return {
				...userData,
				conversionHistory: userDoc?.data()?.conversionHistory,
				watchList: userDoc?.data()?.watchList,
			};
		} catch (error) {
			if (error instanceof FirebaseError) {
				return rejectWithValue(error.code);
			}
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const signInWithGoogle = createAsyncThunk<User, void, { rejectValue: string }>(
	'user/signInWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			const response = await signInWithPopup(auth, googleProvider);
			const userData = getUserDataObject(response);
			await setDoc(doc(db, 'users', response.user.uid), userData);

			return userData;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const signOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
	'user/signOutUser',
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const resetUserPassword = createAsyncThunk<void, UserEmail, { rejectValue: string }>(
	'users/resetPassword',
	async (email, { rejectWithValue }) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const sendVerificationMessage = createAsyncThunk<void, void, { rejectValue: string }>(
	'user/sendVerification',
	async (_, { rejectWithValue }) => {
		try {
			await sendEmailVerification(auth.currentUser!);
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

type UpdateProfileType = Pick<User, 'imageUrl' | 'login'>

export const updateUserProfile = createAsyncThunk<
	UpdateProfileType,
	UpdateProfileType,
    { rejectValue: string, state: AppState }
>(
	'user/updateProfile',
	async (data, { rejectWithValue, getState }) => {
		const user = userSelectors.selectUser(getState());
		try {
			const userDocRef = doc(db, 'users', user!.id);
			await updateDoc(userDocRef, {
				login: data.login,
				imageUrl: data.imageUrl,
			});
			return data;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const addHistory = createAsyncThunk<
    HistoryType,
    HistoryType,
    { rejectValue: string, state: AppState }
>(
	'user/addHistory',
	async (history, { rejectWithValue, getState }) => {
		const user = userSelectors.selectUser(getState());
		try {
			const userDocRef = doc(db, 'users', user!.id);
			await updateDoc(userDocRef, {
				conversionHistory: arrayUnion(createHistoryDoc(
					history.coinFrom,
					history.coinTo,
					history.amount,
					history.convertResult,
				)),
			});
			return history;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const clearHistory = createAsyncThunk<
    void,
    void,
    { rejectValue: string, state: AppState }
>(
	'user/clearHistory',
	(_, { rejectWithValue, getState }) => {
		const user = userSelectors.selectUser(getState());
		try {
			const userDocRef = doc(db, 'users', user!.id);
			return updateDoc(userDocRef, {
				conversionHistory: [],
			});
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const addWatchListCoin = createAsyncThunk<
	CoinUId,
    CoinUId,
    { rejectValue: string, state: AppState }
>(
	'user/addWatchListCoin',
	async (uuid, { rejectWithValue, getState }) => {
		const user = userSelectors.selectUser(getState());
		const watchListCoins = userSelectors.selectUserWatchListCoins(getState());
		const watchListIds = userSelectors.selectUserWatchListIds(getState());
		try {
			const userDocRef = doc(db, 'users', user!.id);
			await updateDoc(userDocRef, {
				watchList: {
					ids: watchListIds.concat(uuid),
					coins: watchListCoins,
				},
			});
			return uuid;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const removeWatchListCoin = createAsyncThunk<
    CoinUId,
    CoinUId,
    { rejectValue: string, state: AppState }
>(
	'user/removeWatchListCoin',
	async (uuid, { rejectWithValue, getState }) => {
		const user = userSelectors.selectUser(getState());
		const watchListCoins = userSelectors.selectUserWatchListCoins(getState());
		const watchListIds = userSelectors.selectUserWatchListIds(getState());

		try {
			const userDocRef = doc(db, 'users', user!.id);
			await updateDoc(userDocRef, {
				watchList: {
					ids: watchListIds.filter((id) => id !== uuid),
					coins: watchListCoins.length
						? watchListCoins.filter((coin) => coin.uuid !== uuid)
						: watchListCoins,
				},
			});
			return uuid;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const fetchWatchListCoins = createAsyncThunk<
    Coin[],
    void,
    { rejectValue: string, state: AppState }
>(
	'user/fetchWatchListCoins',
	async (_, { rejectWithValue, getState }) => {
		const watchListIds = userSelectors.selectUserWatchListIds(getState());
		try {
			if (watchListIds.length) {
				const response = await coinApi.get('/coins', {
					params: {
						uuids: watchListIds,
					},
				});
				const watchListCoins: Coin[] = response.data.data.coins;
				const indexes = watchListIds.map((id) => watchListCoins.findIndex((coin) => (
					coin.uuid === id
				)));
				const result = indexes.map((value) => watchListCoins[value]);
				return result;
			} return [];
		} catch (e) {
			return rejectWithValue(JSON.stringify(e));
		}
	},
);

export const updateWatchList = createAsyncThunk<
    void,
    void,
    { rejectValue: string, state: AppState }
>(
	'user/updateWatchList',
	(_, { rejectWithValue, getState }) => {
		const watchListIds = userSelectors.selectUserWatchListIds(getState());
		const watchListCoins = userSelectors.selectUserWatchListCoins(getState());
		const user = userSelectors.selectUser(getState());
		try {
			const userDocRef = doc(db, 'users', user!.id);
			return updateDoc(userDocRef, {
				watchList: {
					ids: watchListIds,
					coins: watchListCoins,
				},
			});
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);
