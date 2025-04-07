import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useRemoveMaterialMutation, useFetchReservedDatesQuery } from '../store';

import ExpandablePanel from './ExpandablePanel';
import ReservedDatesList from './ReservedDatesList';
import { formatDate } from '../utilities/dateFunctions';


function MaterialsListItem({ material, options}) {
    const [removeMaterial, results] = useRemoveMaterialMutation();
    const { data, error, isFetching } = useFetchReservedDatesQuery(material);

    const [errorMessage, setErrorMessage] = useState(null);

    const handleRemoveMaterial = () => {
        console.log("remove material", material);

        setErrorMessage(null);
        if (data && data.length > 0) {
            console.log("not possible to delete");
            setErrorMessage("Materiale kan ikke slettes, når der findes en nuværende reservation") ;
            
            // if reservationdates exist back in time, a different errorMessage  
            let now = formatDate(new Date());
            let oldData = data.filter(dateObject =>  (dateObject.reservedDate.split("-").join("")) < now);
            console.log("dates back in time?", oldData);
            if (oldData && oldData.length > 0) {
                setErrorMessage("Materiale kan ikke slettes, når der findes en tidligere reservation") ;
            }
        } else {
            removeMaterial(material);
        }
    }

    let allMaterial = options[material.allMaterialId-1];
    let url = allMaterial.url;
 
    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveMaterial}>
            <DeleteIcon />
        </Button>
        <br />
        <div>
          <a href = {require("../"+url)} target = "_blank" >{material.label}</a>     
        </div>
    </>;

    return ( 
        <div>
        <div className="text-red-600/100" > {errorMessage}</div> 
            <ExpandablePanel key={material.id} header={header}>
                <ReservedDatesList material={material}/>
            </ExpandablePanel>
        </div>
    );
}

export default MaterialsListItem;