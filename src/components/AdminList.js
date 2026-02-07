
import { useState } from 'react';
import AdminListItem from './AdminListItem';

function AdminList( {options}) {
console.log(options);
 
    const [allMaterials, setAllMaterials] = useState(options);
       
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