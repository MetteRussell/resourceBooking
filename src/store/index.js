import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducers } from './slices/usersSlice';
import { userApi } from './apis/userApi';
import { materialsApi } from './apis/materialsApi';
import { reservedDateApi } from './apis/reservedDateApi';

export const store = configureStore({
    reducer: {
        users: usersReducers,
        [userApi.reducerPath]: userApi.reducer,
        [materialsApi.reducerPath]: materialsApi.reducer,
        [reservedDateApi.reducerPath]: reservedDateApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(materialsApi.middleware)
            .concat(reservedDateApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/deleteUser';
export { useGetUserQuery, useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } from './apis/userApi';
export { useFetchMaterialsQuery, useAddMaterialMutation, useRemoveMaterialMutation } from './apis/materialsApi';
export { useFetchReservedDatesQuery, useFetchReservedDatesForOneMaterialQuery, useAddReservedDateMutation, useRemoveReservedDateMutation} from './apis/reservedDateApi';