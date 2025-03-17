import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveReservedDateMutation } from '../store';

function ReservedDatesListItem({ reservedDateObject }) {
    const [removeReservedDate, results] = useRemoveReservedDateMutation();

    const handleRemoveReservedDate = () => {
        removeReservedDate(reservedDateObject);
    };

    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveReservedDate}><DeleteIcon /></Button>
        {reservedDateObject.reservedDate}
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

export default ReservedDatesListItem;