import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from 'app/store/config/AppState';
import { AppDispatch } from 'app/store/config/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
