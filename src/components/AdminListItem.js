
import { useDispatch, useSelector } from 'react-redux';
import { useFetchReservedDatesForOneMaterialQuery} from '../store';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useThunk } from '../hooks/useThunk';
import axios from 'axios';

import Skeleton from './Skeleton';
import Button from './Button';
import MaterialsListItem from './MaterialsListItem';
import MaterialDialog from './MaterialDialog';
import ExpandablePanel from './ExpandablePanel';
import AdminReservedDatesList from './AdminReservedDatesList';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CategoryIcon from '@mui/icons-material/Category';


function AdminListItem( {oneMaterial} ) {
 
    console.log(oneMaterial);




    // let material = {
    //     id: allMaterial.id,
    //     reservedDate: '',
    //     allMaterialId: allMaterial.id
    // };
//    let material = {'id': 1, 'materialId': 0, 'reservedDate': '' , 'allMaterialId': allMaterial.id } ;
       

 //   console.log("before fetchMaterial", material);
    // const { data, error, isFetching } = useFetchReservedDatesForOneMaterialQuery(material);
    // //const [errorMessage, setErrorMessage] = useState(null);


    //  // for selected material based on a list of possible materials
    //  const [open, setOpen] = useState(false);
    //  const [selectedValue, setSelectedValue] = useState(material);
    //  console.log("selectedValue", selectedValue);
 
    
    //  console.log("after fetchMaterial", data);

    const header = <> 
        <Button className="mr-2"><CategoryIcon/></Button>
        {oneMaterial.label}
        </>;

return ( 
    <div>
    <div className="text-red-600/100" ></div> 
        <ExpandablePanel key={oneMaterial.id} header={header}>
            <AdminReservedDatesList material={oneMaterial}/>
        </ExpandablePanel>
        </div>
);
};

export default AdminListItem;