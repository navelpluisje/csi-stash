import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@store/store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
