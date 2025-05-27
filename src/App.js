
import Login from './components/Login';
import Route from './components/Route';
import AdminList from './components/AdminList';
import { useFetchMaterialAllsQuery } from './store';
import Skeleton from './components/Skeleton';
import keys from './config/keys.js';


function App() {

    const { data, error, isFetching } = useFetchMaterialAllsQuery();

    let content;
    if (isFetching) {
        content =  <Skeleton times={1} className="h-10 w-full" />;
    } else if (error) {
        content = <div>Error fetching data ...</div>;
    } else {
        content = <Login  options={data}></Login>
    };

    let admin;
    if (isFetching) {
        admin =  <Skeleton times={1} className="h-10 w-full" />;
    } else if (error) {
        admin = <div>Error fetching data ...</div>;
    } else {
        admin = <AdminList  options={data}></AdminList>
    };

    console.log(process.env.NODE_ENV );
    console.log(keys.url);
    return (
        <div className="container mx-auto ">
            <div className="flex flex-wrap items-center bg-green-500 gap-x-4 gap-y-10 p-10">
    <p className="text-xl leading-6 text-black-900">
      <strong className="font-semibold">NBV Reservationssystem</strong>
      </p>

        </div>
            <Route path ='/admin'  >
                {admin}
            </Route>
            <Route path='/'>
                {content}
            </Route>
        </div>
    );
}

export default App;