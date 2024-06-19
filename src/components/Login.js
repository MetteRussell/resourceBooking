


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, userGetUserQuery} from '../store';
import { useThunk } from '../hooks/useThunk';
import axios from 'axios';
import Skeleton from './Skeleton';
import Button from './Button';
import UserList from './UserList';
import UsersList from './UsersList';
import UsersListItem from './UsersListItem';
import MaterialsList from './MaterialsList';
import { useFetchUsersQuery, useAddUserMutation } from '../store';

function LoginPage( ) {
    const [materials, setMaterials] = useState([]);
    const [selectedName, setSelectedName] = useState();

    const fetchMaterials = async () => {
		const response = await axios.get('http://localhost:3005/allMaterials');
		setMaterials(response.data);
	};

    useEffect(() => {
		fetchMaterials();
	}, [] );

 //   const [addUser, results] = useAddUserMutation();

//    let thisUser ;
    // let thisName;
    // console.log(thisName);
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);


    
    const {data} = useSelector((state) => {
        return state.users; 
    });
    console.log(data);
    // Moved because we now use useState locally in this component
    // const {isLoading, data, error} = useSelector((state) => {
    //     return state.users; 
    // });
    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers]);


    const handleUserAdd =() => {
 //       doCreateUser();
    };

	

    // const {name} = useSelector((state) => {
    //     return {
    //         name: state.form.name
    //     };
    // });
	// console.log("LoginPage", name);


	const handleNameChange = (event) => {
//        dispatch(changeName(event.target.value));
		console.log("handleNameChange", event.target.value);
        const thisName = event.target.value;
        setSelectedName(thisName);
        console.log(thisName);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
		console.log("handleSubmit", data);

        let user;
        console.log(selectedName, user);
        if (data && data.length > 0) {
            
            user = data.find((item) => {    
                return item.name === selectedName;
            });
        };
        
        if (!user ) {
            // create user
            console.log("create user");
            user = {name: selectedName};
            doCreateUser(user);
//            addUser(user);
        } else {
            console.log("user found");
        };
        
    
        console.log(selectedName);
    };

    
    let content;
    if (isLoadingUsers) {
        content =  <Skeleton times={1} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data ...</div>;
    } else {
        const thisUser = data.find((item) => {   
            return item.name === selectedName;
        });

        if (thisUser) {
            return <UsersListItem key={thisUser.id} user={thisUser } options={materials}></UsersListItem>
        };
    };

	return ( <div>
          
            <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center m-3" >
            <h1 className="m2 text-xl"> Indtast email-adresse</h1>
				<div className="field-group">
					<div className="field">
						<input type="search" id="default-search"  onChange={handleNameChange} className="input" placeholder="Enter email..." required />
					</div>
				</div>
				 <div className="field">
					<Button className="button is-link" primary="true">Submit</Button>
				</div>

            
            {
                creatingUserError && 'Error creatingUser ...'
            }
        </div>
        {content}
        </form> 
        </div>

        
	);

}
export default LoginPage;