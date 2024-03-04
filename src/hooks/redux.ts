import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StateSchema } from 'redux/config/StateSchema';
import { AppDispatch } from 'redux/config/store';

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
