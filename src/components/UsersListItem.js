
import DeleteIcon from '@mui/icons-material/Delete';
import ShowIcon from '@mui/icons-material/Sailing';
import Link from './Link';
import Button from './Button';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/useThunk';
import { useState } from 'react';
import ExpandablePanel from './ExpandablePanel';
import MaterialsList from  './MaterialsList';
import AdminList from  './AdminList';

import { useFetchMaterialsQuery } from '../store';

function UsersListItem({ user , options}) {
    console.log(user, options);
    const [doDeleteUser, isDeletingUser, error] = useThunk(deleteUser); 
    const { data, materialerror, isFetching } = useFetchMaterialsQuery(user);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleClick = () => {
        console.log("remove user",user);
        console.log("material for user", data);

        setErrorMessage(null);
        if (data && data.length > 0) {
            console.log("not possible to delete user");
            
        } else {
            doDeleteUser(user);
        }
    }
    const handleAdmin = () => {
        console.log("handleAdmin", options);
    }

    const header = <>
        <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
            <DeleteIcon />
        </Button>
        {error && <div>Error deleting user.</div>}            
        {user.name}
        </>

    let administrator = "";
    if (user.isAdmin == "yes") {
        administrator = <>
        
            <Button className="mr-3 button is-lin"  onClick={handleAdmin} primary rounded >Go to Admin
                <Link to='/admin' state={{materials: options}}></Link>
            </Button>
        </>
    } 



    return (
        <div>
        <div className="text-red-600/100" > {errorMessage}</div> 
        <ExpandablePanel header={header}>
            <MaterialsList user={user} options={options}/>
        </ExpandablePanel>
        
 
        {administrator}
        </div>
    )
}

export default UsersListItem;