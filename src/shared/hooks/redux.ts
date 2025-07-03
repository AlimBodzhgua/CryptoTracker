import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'app/store/config/AppState';
import { AppDispatch } from 'app/store/config/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
