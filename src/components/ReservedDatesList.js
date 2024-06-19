import { useState } from 'react';
import { useFetchReservedDatesQuery, useAddReservedDateMutation } from '../store';
import ReservedDatesListItem from './ReservedDatesListItem';
import DatepickerDialog from './DatepickerDialog';
import Skeleton from './Skeleton';

function ReservedDatesList({ material }) {

    useFetchReservedDatesQuery(material);

    const { data, error, isFetching } = useFetchReservedDatesQuery(material);
    const [addReservedDate, results] = useAddReservedDateMutation();

    // for selected reservedDates based on a list of possible materials
    const [open, setOpen] = useState(false);

    // open the reserved dates dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
        
    // saving the reserved dates
    const handleSave = (selectedObjects) => {
        console.log("handleSave", selectedObjects);
        setOpen(false);

        let selectedDateObject = {};
        selectedObjects.map((selectedDate) => {
            let reservedDate = new Date(selectedDate).toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"});
            selectedDateObject = {
                materialId: material.id,
                reservedDate: reservedDate,
                allMaterialId: material.allMaterialId
            };

            // if allDates already contain the date, dont add it again
            let totalReservedDates = data.map(a => a.reservedDate);
            if (!totalReservedDates.includes(reservedDate)) {
                addReservedDate(selectedDateObject);
            };
        });        
    };

    // sort the date array
        console.log("sorting the array");
    let dataVar = [];
    if (data && data.length > 0) {
        dataVar = JSON.parse(JSON.stringify(data));
        dataVar.sort((a, b) => {
            const nameA = a.reservedDate; 
            const nameB = b.reservedDate; 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    };
          
    let content = '';
    if (isFetching) {
        content =<Skeleton className="h-10 w-full" times={1} />
    } else if (error) {
        content = <div> Error loading material.</div> 
    } else if (dataVar && dataVar.length > 0) {
        content = dataVar.map(reservedDate => {
            return <ReservedDatesListItem key={reservedDate.id} reservedDateObject={reservedDate} />
        });  
    } else {
        content = "Ingen datoer er reserveret";
    };

    return ( 
        <div>
            <div className="m-2 flex flex-row items-center justify-between" >
            <h3 className="text-lg font-bold">Reserverede datoer for {material.label} </h3>
            <DatepickerDialog 
      //          open={open}
                onSave={handleSave}
                material={material} />
            </div>
            <div>
                {content}
            </div>
        </div>
    );
}

export default ReservedDatesList;