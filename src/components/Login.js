import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchUsersQuery, useAddUserMutation, userGetUserQuery} from '../store';

import { useThunk } from '../hooks/useThunk';
import axios from 'axios';
import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';
import validator from "validator";

function LoginPage( ) {
    const [materials, setMaterials] = useState([]);
    const [selectedName, setSelectedName] = useState();
    const [emailError, setEmailError] = useState("");

    const fetchMaterials = async () => {
		const response = await axios.get('http://localhost:3005/allMaterials');
		setMaterials(response.data);
	};

    useEffect(() => {
		fetchMaterials();
	}, [] );

    const { data, error, isFetching } = useFetchUsersQuery();
    console.log("after fetch users", data);
    const [addUser, results] = useAddUserMutation();
    console.log(results);

    // const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    // const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
    
    const {users} = useSelector((state) => {
        return state.users; 
    });
 
    // useEffect(() => {
    //     doFetchUsers()
    // }, [doFetchUsers]);




	const handleNameChange = (event) => {
        const thisName = event.target.value;
        setSelectedName(thisName);
        if (validator.isEmail(thisName)) {
            setEmailError("");
        } else {
            setEmailError("Enter valid Email!");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let user;
        if (users && users.length > 0) {
            
            user = users.find((item) => {    
                return item.name === selectedName;
            });
        };
        
        if (!user ) {
            // create user
            console.log("create user")
            user = {name: selectedName, isAdmin: "no"}
            addUser(user)
        } else {
            console.log("user found")
        };
    };

    
    let content;
    if (isFetching) {
        content =  <Skeleton times={1} className="h-10 w-full" />;
    } else if (error) {
        content = <div>Error fetching data ...</div>;
    } else {
        const thisUser = data.find((item) => {   
            return item.name === selectedName;
        });
       
        if (thisUser) {
            return <UsersListItem key={thisUser.id} user={thisUser } options={materials}></UsersListItem>
        };
    };

    let emailValid;
    if (emailError && emailError.length > 0) {
        emailValid = <div className="text-red-600/100">{emailError}</div>
    } else {
        emailValid = <div className="field"><Button primary rounded className="button is-lin" >Submit</Button></div>;
    };
     
	return ( <div>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center m-3" >
            <h1 className="m2 text-xl"> Indtast email-adresse</h1>
				<div className="field-group w-3/5">
					<div className="field">
						<input type="search" id="default-search"  onChange={handleNameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Indtast email..." required />
					</div>
				</div>
                {emailValid}
                {
 
                }
            </div>
            {content}
            </form> 
            
        </div>
	)

}
export default LoginPage;