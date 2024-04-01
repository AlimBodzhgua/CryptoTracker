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
import { auth, googleProvider } from 'config/firebase/firebase';

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
                email: response.user.email,
                login: response.user.displayName || '',
                imageUrl: response.user.photoURL || '',
                password: response.user.refreshToken,
                isEmailVerified: response.user.emailVerified,
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
                email: response.user.email,
                login: response.user.displayName || '',
                imageUrl: response.user.photoURL || '',
                password: response.user.refreshToken,
                isEmailVerified: response.user.emailVerified,
            } as IUser;
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
