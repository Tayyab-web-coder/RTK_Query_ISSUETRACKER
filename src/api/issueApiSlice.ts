import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Issue {
    id: number;
    title: string;
    description: string;
    status: "open" | "in-progress" | "closed";
    priority: "Low" | "Medium" | "High";
    createdAt: string;
    updatedAt: string;
}

export const IssueApi = createApi({
    reducerPath: 'IssueApi',
    tagTypes: ['Issue'],

    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (build) => (
        {

            getUserIssue: build.query<Issue[], void>({
                query: () => 'issues',
                providesTags: ['Issue'],
            }),
            getUserIssueById: build.query<Issue, { id: string; }>({
                query: ({ id }) => `issues/${id}`,
            }),

            createUserIssue: build.mutation<Issue, Partial<Issue>>({
                query: (newIssue) => ({
                    url: 'issues',
                    method: 'POST',
                    body: {
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        ...newIssue
                    },
                }),
                invalidatesTags: ['Issue'],
            }),

            deleteUserIssue: build.mutation<Issue, { id: string; }>({
                query: ({ id }) => (
                    {
                        url: `issues/${id}`,
                        method: 'DELETE',
                    }),
                invalidatesTags: ['Issue'],
            }),

            updateUserIssue: build.mutation<Issue, { data: Partial<Issue> }>({
                query: ({data }) => (
                    console.log(data),
                    {
                    url: `issues/${data.id}`,
                    method: 'PATCH',
                    body: data,
                }),
                invalidatesTags: ['Issue'],
            }),

        }),
})

export const {
    useGetUserIssueQuery,
    useGetUserIssueByIdQuery,
    useCreateUserIssueMutation,
    useDeleteUserIssueMutation,
    useUpdateUserIssueMutation } = IssueApi