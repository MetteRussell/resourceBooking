
import Button from './Button';
import BuildIcon from '@mui/icons-material/Build';
import { useGetUserQuery} from '../store';
import Skeleton from './Skeleton';

function AdminReservedDatesListItem({ reservedDateObject }) {
   
    console.log(reservedDateObject);
    const user = {
        id: reservedDateObject.userId
    }
   
    const { data, error, isFetching } = useGetUserQuery(user);

    
    let content;
    if (isFetching) {
        content = <Skeleton times={3} />

    } else if (error) {
        content = <div>Error loading user.</div>
    } else {
        content = data[0].name;
    }

    const header = <>
        <Button className="mr-2" ><BuildIcon /></Button>
        {reservedDateObject.reservedDate},  {content}
        </>;

    return ( 
        <div className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center ">
                <div className="flex felx-row items-center justify-between ">
                    {header}
                </div>
            </div>
        </div> 
    );
}

export default AdminReservedDatesListItem;