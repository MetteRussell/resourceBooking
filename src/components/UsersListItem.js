
import DeleteIcon from '@mui/icons-material/Delete';
import Button from './Button';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel';
import MaterialsList from  './MaterialsList';

function UsersListItem({ user , options}) {
    console.log(user);
    const [doDeleteUser, isDeletingUser, error] = useThunk(deleteUser); 

    const handleClick = () => {
        doDeleteUser(user);
    }

    const header = <>
        <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
            <DeleteIcon />
        </Button>
        {error && <div>Error deleting user.</div>}            
        {user.name}
        </>

    return (
        <ExpandablePanel header={header}>
            <MaterialsList user={user} options={options}/>
        </ExpandablePanel>
    )
}

export default UsersListItem;