import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    setDoc, doc, updateDoc, arrayUnion, getDoc,
} from 'firebase/firestore';
import { auth, googleProvider, db } from 'config/firebase/firebase';
import { createHistoryDoc, getUserDataObject } from 'utils/utils';
import { StateSchema } from 'redux/config/StateSchema';
import { HistoryType } from 'types/converter';
import { FirebaseError } from 'firebase/app';
import { IUser } from 'types/user';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import {
    selectUser,
    selectUserWatchListCoins,
    selectUserWatchListIds,
} from 'redux/selectors/userSelectors';
import { ICoin } from 'types/coin';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import axios from 'axios';

export const initUserAuth = createAsyncThunk<
    IUser,
    string,
    {rejectValue: string}
>(
    'initUserAuth',
    async (userId, { rejectWithValue }) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            return userDoc.data() as IUser;
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                return rejectWithValue(error.code);
            }
            return rejectWithValue(JSON.stringify(error));
        }
    },
);

export const signUpUser = createAsyncThunk<
	IUser,
	{email: string, password: string},
	{rejectValue: string}
>(
    'signUpUser',
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
	IUser,
	{email: string, password: string},
	{rejectValue: string}
>(
    'signInUser',
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

export const signInWithGoogle = createAsyncThunk<
    IUser,
    void,
    {rejectValue: string}
>(
    'signInWithGoogle',
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

export const signOutUser = createAsyncThunk<
	void,
	void,
	{rejectValue: string}
>(
    'signOutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);

export const resetUserPassword = createAsyncThunk<
    void,
    string,
    {rejectValue: string}
>(
    'resetPassword',
    async (email, { rejectWithValue }) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);

export const sendEmailVerificationMessage = createAsyncThunk<
    void,
    void,
    {rejectValue: string}
>(
    'resetPassword',
    async (_, { rejectWithValue }) => {
        try {
            await sendEmailVerification(auth.currentUser!);
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);

type updateUserProfileType = Pick<IUser, 'imageUrl' | 'login'>

export const updateUserProfile = createAsyncThunk<
    updateUserProfileType,
    updateUserProfileType,
    {rejectValue: string}
>(
    'updateUserProfile',
    async (data, { rejectWithValue }) => {
        try {
            await updateProfile(auth.currentUser!, {
                displayName: data.login,
                photoURL: data.imageUrl,
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
    {
        rejectValue: string,
        state: StateSchema,
    }
>(
    'addHistory',
    async (history, { rejectWithValue, getState }) => {
        const user = selectUser(getState());
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
    {
        rejectValue: string,
        state: StateSchema,
    }
>(
    'clearHistory',
    async (_, { rejectWithValue, getState }) => {
        const user = selectUser(getState());
        try {
            const userDocRef = doc(db, 'users', user!.id);
            await updateDoc(userDocRef, {
                conversionHistory: [],
            });
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);

export const addWatchListCoin = createAsyncThunk<
    string,
    string,
    {
        rejectValue: string,
        state: StateSchema,
    }
>(
    'addWatchListCoin',
    async (uuid, { rejectWithValue, getState }) => {
        const user = selectUser(getState());
        const watchListCoins = selectUserWatchListCoins(getState());
        const watchListIds = selectUserWatchListIds(getState());
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
    string,
    string,
    {
        rejectValue: string,
        state: StateSchema,
    }
>(
    'removeWatchListCoin',
    async (uuid, { rejectWithValue, getState }) => {
        const user = selectUser(getState());
        const watchListCoins = selectUserWatchListCoins(getState());
        const watchListIds = selectUserWatchListIds(getState());
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

const coinHeaders = {
    'Content-Type': 'application/json',
    'x-access-token': process.env.API_KEY,
};

export const fetchWatchListCoins = createAsyncThunk<
    ICoin[],
    void,
    {
        rejectValue: string,
        state: StateSchema,
    }
>(
    'fetchWatchListCoins',
    async (_, { rejectWithValue, getState }) => {
        const watchListIds = selectUserWatchListIds(getState());
        try {
            if (watchListIds.length) {
                const response = await axios.get('https://api.coinranking.com/v2/coins', {
                    headers: coinHeaders,
                    params: {
                        uuids: watchListIds,
                    },
                });
                const watchListCoins: ICoin[] = response.data.data.coins;
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
    {
        rejectValue: string,
        state: StateSchema,
    }
>(
    'updateWatchList',
    async (_, { rejectWithValue, getState }) => {
        const watchListIds = selectUserWatchListIds(getState());
        const watchListCoins = selectUserWatchListCoins(getState());
        const user = selectUser(getState());
        try {
            const userDocRef = doc(db, 'users', user!.id);
            await updateDoc(userDocRef, {
                watchList: {
                    ids: watchListIds,
                    coins: watchListCoins,
                },
            });
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);
