
import DeleteIcon from '@mui/icons-material/Delete';
import Link from './Link';
import Button from './Button';
import { useState } from 'react';
import ExpandablePanel from './ExpandablePanel';
import MaterialsList from  './MaterialsList';

import { useFetchMaterialsQuery, useRemoveUserMutation} from '../store';

function UsersListItem({ user , options}) {
    console.log(user, options);

    const [ deleteUser, results ] = useRemoveUserMutation();
	
    const { data, materialerror, isFetching } = useFetchMaterialsQuery(user);

    const [errorMessage, setErrorMessage] = useState(null);

    const handleRemoveUser = () => {
        console.log("remove user",user);
        console.log("material for user", data);

        setErrorMessage(null);
        if (data && data.length > 0) {
            console.log("not possible to delete user");
            setErrorMessage("bruger kan ikke slettes, da der findes valgt udstyr") ;
        } else {
			console.log("delete user now");
            deleteUser(user);
        }
    }

    const handleAdmin = () => {
        console.log("handleAdmin");
    }

    const header = <>

		{user.name} 
        </>;

    let administrator = "";
    if (user.isAdmin === "yes") {
        administrator = <>
        <Link to='/admin' state={{options}}>
            <Button className="mr-3 button is-lin"  onClick={handleAdmin} primary rounded >Go to Admin
            </Button>
        </Link>    
        </>
    } ;

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