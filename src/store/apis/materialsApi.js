import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const materialsApi = createApi({
    reducerPath: 'materials',
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
            fetchMaterials: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(material => { 
                        return { type: 'Material', id: material.id }
                    });
                    tags.push({ type: 'UserMaterial', userId: user.id });
                    return tags;
                },
                query: (user) => {
                    console.log("fetch materials api",user);
                    return {
                        url: '/materials',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                }
            }),
            addMaterial: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{type: 'UserMaterial', userId: user.id}]
                },
                query: (data) => {
                    console.log("add material api");
                    const { userId, label, allMaterialId } = data;
                    return {
                        url: '/materials',
                        method: 'POST',
                        body: {
                            userId: userId,
                            label: label,
                            allMaterialId: allMaterialId
                        } 
                    }
                }
            }),
            removeMaterial: builder.mutation({
                invalidatesTags: (result, error, material) => {
                    return [{type: 'Material', id: material.id}]
                },
                query: (material) => {
                    return {
                        url: `/materials/${material.id}`,
                        method: 'DELETE',
                    }
                }
            })
        };
    }
});

export const { useFetchMaterialsQuery, useAddMaterialMutation, useRemoveMaterialMutation } = materialsApi;
export { materialsApi };