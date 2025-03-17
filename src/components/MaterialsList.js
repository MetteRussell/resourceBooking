import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchMaterialsQuery, useAddMaterialMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import MaterialsListItem from './MaterialsListItem';
import MaterialDialog from './MaterialDialog';

function MaterialsList({ user, options }) {

    console.log(user, options);
    // for fetching and adding materials for a user
    const { data, error, isFetching } = useFetchMaterialsQuery(user);
    console.log("after fetchMaterial", data);
    const [addMaterial, results] = useAddMaterialMutation();
    
    // for selected material based on a list of possible materials
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[1]);
    console.log("selectedValue", selectedValue);

    // open the material dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // closing the material dialog
    const handleClose = (selectedObject) => {
        setOpen(false);
        setSelectedValue(selectedObject);

        var result = data.find((item) => {    
            return item.label === selectedObject.label;
        });
        
        if (!result ) {
            const newMaterial = {userId: user.id, label: selectedObject.label, allMaterialId: selectedObject.id};
            addMaterial(newMaterial);
        };
    };

    let content;
    if (isFetching) {
        content =<Skeleton className="h-10 w-full" times={3} />
    } else if (error) {
        content = <div> Fejl ved læsning af udstyr.</div> 
    } else {
        content = data.map(material => {
            return <MaterialsListItem key={material.id} material={material} />
        });
    }

    return ( <div>
        <div className="m-2 flex flex-row items-center justify-between" >

            <h3 className="text-lg font-bold">Udstyr for {user.name} </h3>
           
            <Button primary rounded  onClick={handleClickOpen}>
                Vælg udstyr
            </Button>
            <MaterialDialog onClose={handleClose} 
                selectedValue={selectedValue} 
                open={open} 
                options={options}  />
        </div>
        <div>
            {content}
        </div>
        </div>
    )
};

export default MaterialsList;