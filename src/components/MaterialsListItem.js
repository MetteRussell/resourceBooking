import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveMaterialMutation } from '../store';
import ExpandablePanel from './ExpandablePanel';
import ReservedDatesList from './ReservedDatesList';

function MaterialsListItem({ material }) {
    const [removeMaterial, results] = useRemoveMaterialMutation();

    const handleRemoveMaterial = () => {
        removeMaterial(material);
    }

    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveMaterial}><DeleteIcon /></Button>
        {material.label}
        </>;

    return ( 
        <ExpandablePanel key={material.id} header={header}>
            <ReservedDatesList material={material}/>
        </ExpandablePanel>
    );

}

export default MaterialsListItem;