import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { faker } from '@faker-js/faker';

// DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        // DEV ONLY
        // fetchFn: async (...args) => {
        //     await pause(1000);
        //     return fetch(...args);
        // }
    }),
    endpoints(builder) {
        return {
            getUser: builder.query({
                providesTags: (result, error, user) => {return [{type: 'User', id: user.id}]},
                query: (user) => {
                    console.log("getuser api", user);
                    return {
                        url: '/users',
                        params: {
                            id: user.id
                        },
                        method: 'GET',
                    };
                }
            }),
            fetchUsers: builder.query({
                providesTags: ['allUsers'],
                query: () => {
                    console.log("user api");
                    return {
                        url: '/users',
                        method: 'GET',
                    };
                }
            }),
            addUser: builder.mutation({
                invalidatesTags: ['allUsers'],
                query: (user) => {
                    return {
                        url: '/users',
                        method: 'POST',
                        body: {
                            name: user.name
                        } 
                    }
                }
            }),
            removeUser: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{type: 'User', id: user.id}]
                },
                query: (user) => {
                    return {
                        url: `/users/${user.id}`,
                        method: 'DELETE',
                    }
                }
            })
        };
    }
});

export const { useGetUserQuery, useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } = userApi;
export { userApi };