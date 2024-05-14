import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StateSchema } from 'store/config/StateSchema';
import { AppDispatch } from 'store/config/store';

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
