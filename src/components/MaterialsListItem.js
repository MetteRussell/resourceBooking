import Button from './Button';
import { GoTrashcan, goTrashcan } from 'react-icons/go';
import { useRemoveMaterialMutation } from '../store';
import ExpandablePanel from './ExpandablePanel';
import ReservedDatesList from './ReservedDatesList';

function MaterialsListItem({ material }) {
    console.log(material);
    const [removeMaterial, results] = useRemoveMaterialMutation();

    const handleRemoveMaterial = () => {
        removeMaterial(material);
    }

    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveMaterial}><GoTrashcan /></Button>
        {material.label}
        </>;

    return ( 
        <ExpandablePanel key={material.id} header={header}>
            <ReservedDatesList material={material}/>
        </ExpandablePanel>
    );

}

export default MaterialsListItem;