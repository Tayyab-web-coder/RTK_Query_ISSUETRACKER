import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Issue {
    id: number;
    title: string;
    description: string;
    status: "open" | "in-progress" | "closed";
    priority: "low" | "medium" | "high";
    createdAt: string;
    updatedAt: string;
}

export const IssueApi = createApi({
    reducerPath: 'IssueApi',

    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (build) => ({
        getUserIssue: build.query<Issue[], void>({
            query: () => 'issues',
        }),
        createUserIssue: build.mutation<Issue, Partial<Issue>>({
            query: (newIssue) => ({
                url: 'issues',
                method: 'POST',
                body: { id: Date.now(), createdAt: new Date().toISOString(), ...newIssue },
                invalidatesTags: ['Issue'],
            })
        }),
        deleteUserIssue: build.mutation<Issue, { id: number; data: Partial<Issue> }>({
            query: ({ id, data }) => ({
                url: `issues/${id}`,
                method: 'DELETE',
                body: data,
            })
        }),
        updateUserIssue: build.mutation<Issue, { id: number; data: Partial<Issue> }>({
            query: ({ id, data }) => ({
                url: `issues/${id}`,
                method: 'DELETE',
                body: data,
            })
        }),
    }),
})

export const { useGetUserIssueQuery, useCreateUserIssueMutation, useDeleteUserIssueMutation, useUpdateUserIssueMutation } = IssueApi