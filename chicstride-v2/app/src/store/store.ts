import { configureStore } from '@reduxjs/toolkit';
// import someSlice from './someSlice';

export const store = configureStore({
    reducer: {
        // some: someSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: true,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
