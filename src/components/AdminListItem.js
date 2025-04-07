
import AdminReservedDatesList from './AdminReservedDatesList';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import CategoryIcon from '@mui/icons-material/Category';

function AdminListItem( {oneMaterial} ) {
 
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