import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { materialAllsApi } from './apis/materialAllsApi';
import { userApi } from './apis/userApi';
import { materialsApi } from './apis/materialsApi';
import { reservedDateApi } from './apis/reservedDateApi';


export const store = configureStore({
    reducer: {
        [materialAllsApi.reducerPath]: materialAllsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [materialsApi.reducerPath]: materialsApi.reducer,
        [reservedDateApi.reducerPath]: reservedDateApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(materialAllsApi.middleware)
            .concat(userApi.middleware)
            .concat(materialsApi.middleware)
            .concat(reservedDateApi.middleware);
    }
});

setupListeners(store.dispatch);

const startingState = store.getState();
console.log("store", startingState);

export { useFetchMaterialAllsQuery } from './apis/materialAllsApi';
export { useGetUserQuery, useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } from './apis/userApi';
export { useFetchMaterialsQuery, useFetchMaterialByIdQuery, useAddMaterialMutation, useRemoveMaterialMutation } from './apis/materialsApi';
export { useFetchReservedDatesQuery, useFetchReservedDatesForOneMaterialQuery, useAddReservedDateMutation, useRemoveReservedDateMutation} from './apis/reservedDateApi';
