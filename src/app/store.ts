import { configureStore } from '@reduxjs/toolkit'
import { IssueApi } from '../api/issueApiSlice'
export const store = configureStore({
    reducer: {
        [IssueApi.reducerPath]: IssueApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(IssueApi.middleware),
})
