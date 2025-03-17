
import { useDispatch, useSelector } from 'react-redux';
import { useFetchReservedDatesForOneMaterialQuery } from '../store';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useThunk } from '../hooks/useThunk';
import axios from 'axios';

import Skeleton from './Skeleton';
import Button from './Button';
import MaterialsListItem from './MaterialsListItem';
import MaterialDialog from './MaterialDialog';
import AdminListItem from './AdminListItem';
import ExpandablePanel from './ExpandablePanel';


import { formatDate } from '../utilities/dateFunctions';

function AdminList( ) {

     // for selected material based on a list of possible materials
    //  const [open, setOpen] = useState(false);
    //  const [selectedValue, setSelectedValue] = useState();
    const [allMaterials, setAllMaterials] = useState([]);   

    const fetchAllMaterials = async () => {
		const response = await axios.get('http://localhost:3005/allMaterials');
		setAllMaterials(response.data);
	};

    useEffect(() => {
		fetchAllMaterials();
	}, [] );

    // filter and sort the date array
    let dataVar = [];
       
    let content = allMaterials.map(material => {
        return <AdminListItem key={material.id} oneMaterial={material} />
    });
 
return ( <div>
    <div className="m-2 flex flex-row items-center justify-between" >
        <h3 className="text-lg font-bold">Udstyr </h3>
    </div>
    <div>
        {content}
    </div>
    </div>
)
};

export default AdminList;