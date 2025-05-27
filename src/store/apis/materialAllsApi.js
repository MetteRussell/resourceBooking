import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import keys from '../../config/keys.js';

// DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const materialAllsApi = createApi({
    reducerPath: 'allMaterials',
    baseQuery: fetchBaseQuery({
        baseUrl: keys.url+':3005',
        // DEV ONLY
        // fetchFn: async (...args) => {
        //     await pause(1000);
        //     return fetch(...args);
        // }
    }),
    endpoints(builder) {
        return {
            fetchMaterialAlls: builder.query({
                providesTags: ['allMaterials'],
                query: () => {
                    console.log("fetch all materials api");
                    return {
                        url: '/allMaterials',
                        method: 'GET',
                    };
                }
            }),
        };
    }
});

export const { useFetchMaterialAllsQuery } = materialAllsApi;
export { materialAllsApi };

