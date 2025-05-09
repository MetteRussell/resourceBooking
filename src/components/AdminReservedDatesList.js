
import {  useFetchReservedDatesForOneMaterialQuery  } from '../store';
import AdminReservedDatesListItem from './AdminReservedDatesListItem';
import Skeleton from './Skeleton';

function AdminReservedDatesList({ material }) {

    let materialOne = {
        id: material.id,
        allMaterialId: material.id
    };
    const { data, error, isFetching } = useFetchReservedDatesForOneMaterialQuery(materialOne);

    // sort descending based on reserved date
    let dataVar = [];
    if (data && data.length > 0) {
          dataVar = JSON.parse(JSON.stringify(data));
          dataVar.sort((a, b) => {
              const nameA = a.reservedDate; 
              const nameB = b.reservedDate; 

              if (nameA < nameB) {
                  return 1;
              }
              if (nameA > nameB) {
                  return -1;
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
            return <AdminReservedDatesListItem key={reservedDate.id} reservedDateObject={reservedDate} />
        });  
    } else {
        content = <h3 >Ingen datoer er reserveret</h3>;
    };


    return ( 
        <div>
            <div className="m-2 flex flex-row items-center justify-between" >
                <h3 className="text-lg font-bold" >Reserverede datoer for {material.label} </h3>
            </div>
            <div>
                {content}
            </div>
        </div>
    );

}

export default AdminReservedDatesList;