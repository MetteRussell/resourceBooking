
//import { useDispatch, useSelector } from 'react-redux';
//import { useFetchReservedDatesForOneMaterialQuery} from '../store';
//import { useState, useEffect } from 'react';
//import { useLocation } from "react-router-dom";
//import { useThunk } from '../hooks/useThunk';
//import axios from 'axios';

//import Skeleton from './Skeleton';
import Button from './Button';
//import MaterialsListItem from './MaterialsListItem';
//import MaterialDialog from './MaterialDialog';
import ExpandablePanel from './ExpandablePanel';
import AdminReservedDatesList from './AdminReservedDatesList';
//import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CategoryIcon from '@mui/icons-material/Category';


function AdminListItem( {oneMaterial} ) {
 
    console.log(oneMaterial);
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