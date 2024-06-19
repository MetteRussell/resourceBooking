import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser} from '../store';
import { useThunk } from '../hooks/useThunk';
import axios from 'axios';
import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';



function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    // const [isCreatingUser, setIsCreatingUser] = useState(false);
    // const [creatingUserError, setCreatingUserError] = useState(null);
    const [materials, setMaterials] = useState([]);

    const fetchMaterials = async () => {
		const response = await axios.get('http://localhost:3005/allMaterials');
		setMaterials(response.data);
	};

    useEffect(() => {
		fetchMaterials();
	}, [] );
    
    const {data} = useSelector((state) => {
        return state.users; 
    });
    // Moved because we now use useState locally in this component
    // const {isLoading, data, error} = useSelector((state) => {
    //     return state.users; 
    // });
    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers]);


    const handleUserAdd =() => {
        doCreateUser();
    };

    let content;
    if (isLoadingUsers) {
        content =  <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data ...</div>;
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} options={materials}></UsersListItem>
            
        });
    };

    
    return (<div>
        <div className="flex flex-row justify-between items-center m-3" >
            <h1 className="m2 text-xl"> Users</h1>
          
            <Button loading ={isCreatingUser} onClick={handleUserAdd} >
                + Add User
            </Button>
            
            {
                creatingUserError && 'Error creatingUser ...'
            }
        </div>
        {content}
    </div>);
}

export default UsersList;