import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from 'config/firebase/firebase';

export const signUpUser = createAsyncThunk<
	IUser,
	{email: string, password: string},
	{rejectValue: string}
>(
    'signUpUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, user.email, user.password);
            return {
                id: response.user.uid,
                password: response.user.refreshToken,
                email: response.user.email,
            } as IUser;
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
            return {
                id: response.user.uid,
                password: response.user.refreshToken,
                email: response.user.email,
            } as IUser;
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
