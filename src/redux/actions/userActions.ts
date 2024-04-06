import { createAsyncThunk } from '@reduxjs/toolkit';
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
    setDoc, doc, updateDoc, arrayUnion, getDoc,
} from 'firebase/firestore';
import { auth, googleProvider, db } from 'config/firebase/firebase';
import { createHistoryDoc, getUserDataObject } from 'utils/utils';
import { selectUser } from 'redux/selectors/userSelectors';
import { StateSchema } from 'redux/config/StateSchema';
import { HistoryType } from 'types/converter';

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
        } catch (error) {
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
            };
        } catch (error) {
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
