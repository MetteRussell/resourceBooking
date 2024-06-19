import UsersList from './components/UsersList';
import Login from './components/Login';
import { useState, useEffect } from 'react';


function App() {

    return (
        <div className="container mx-auto ">
            <div className="flex flex-wrap items-center bg-green-500 gap-x-4 gap-y-10 p-10">
    <p className="text-xl leading-6 text-black-900">
      <strong className="font-semibold">NBV Reservationssystem</strong>
      </p>

        </div>
            <Login />
        </div>
    );
}

export default App;