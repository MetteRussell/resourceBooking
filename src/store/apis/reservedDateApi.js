import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const reservedDateApi = createApi({
    reducerPath: 'reservedDates',
    baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    // // DEV ONLY
    // fetchFn: async (...args) => {
    //     await pause(1000);
    //     return fetch(...args);
    // }
}),
endpoints(builder) {
    return {
        fetchReservedDates: builder.query({
            providesTags: (result, error, material) => {
                const tags = result.map(reservedDate => { 
                    return { type: 'ReservedDate', id: reservedDate.id }
                    
                });
                tags.push({ type: 'MaterialReservedDate', id: material.id });
                return tags;
            },
            query: (material) => {
                console.log("fetchReservedDates for user/material", material.id);
                return {
                    url: '/reservedDates',
                    params: {
                        materialId: material.id,
                    },
                    method: 'GET',
                };
            }
        }),
        fetchReservedDatesForOneMaterial: builder.query({
            providesTags: (result, error, material) => {
                const tags = result.map(reservedDate => { 
                    return { type: 'ReservedDate', id: reservedDate.id }
                    
                });
                tags.push({ type: 'MaterialReservedDate', id: material.id });
                return tags;
            },
            query: (material) => {
                console.log("fetch reserved dates for specific material", material.allMaterialId);
                return {
                    url: '/reservedDates',
                    params: {
                        allMaterialId: material.allMaterialId,
                    },
                    method: 'GET',
                };
            }
        }),
        addReservedDate: builder.mutation({
            invalidatesTags: (result, error, material) => {
                return [{type: 'MaterialReservedDate', id: material.id}]
            },
            query: (data) => {
                const { materialId, reservedDate, allMaterialId } = data;
                console.log("add reserved date", data);
                return {
                    url: '/reservedDates',
                    method: 'POST',
                    body: {
                        materialId: materialId,
                        reservedDate: reservedDate,
                        allMaterialId: allMaterialId
                    } 
                }
            }
        }),
        removeReservedDate: builder.mutation({
            invalidatesTags: (result, error, reservedDate) => {
                return [{type: 'ReservedDate', id: reservedDate.id}]
            },
            query: (reservedDate) => {
                console.log("remove reserved date");
                return {
                    url: `/reservedDates/${reservedDate.id}`,
                    method: 'DELETE',
                }
            }
        })
    };
}
});

export const { useFetchReservedDatesQuery, useFetchReservedDatesForOneMaterialQuery, useAddReservedDateMutation, useRemoveReservedDateMutation } = reservedDateApi;
export { reservedDateApi };