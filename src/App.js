
import Login from './components/Login';
import Route from './components/Route';
import AdminList from './components/AdminList'

function App() {

    return (
        <div className="container mx-auto ">
            <div className="flex flex-wrap items-center bg-green-500 gap-x-4 gap-y-10 p-10">
    <p className="text-xl leading-6 text-black-900">
      <strong className="font-semibold">NBV Reservationssystem</strong>
      </p>

        </div>
            <Route path ='/admin'  >
                <AdminList />
            </Route>
            <Route path='/'>
                <Login />
            </Route>
        </div>
    );
}

export default App;