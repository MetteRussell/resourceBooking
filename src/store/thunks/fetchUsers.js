import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    console.log("fetchUsers thunk");
    const response = await axios.get('http://localhost:3005/users');
    await pause(1000);
    return response.data;

});

// DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

export { fetchUsers };