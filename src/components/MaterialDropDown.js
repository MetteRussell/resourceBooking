// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { GoChevronDown } from 'react-icons/go';
// import { addMaterial } from '../store';
// //import Panel from './Panel';
// import Dropdown from 'react-bootstrap/Dropdown';

// function MaterialDropdown({ options,  onChange }) {
//     console.log(options);
//     const dispatch = useDispatch();

//     const [ isOpen, setIsOpen ] = useState(false);

    
//     const handleSelectClick = () => {
//         setIsOpen(true);
// //        setIsOpen(!isOpen);
//     };

//     const handleOptionClick = (option) => {
//         console.log('handleOptionsClick', option);
//         setIsOpen(false);

//         // const action = addMaterial(option);
//         // dispatch(action);
//         // console.log(action);
        
//         onChange(option);
//     };

//     let renderedOptions = options.map((option) => {
//         console.log('renderedOptions', option);
//         return (
//             <Dropdown.Item className="block px-4 py-2 text-sm text-gray-700" onClick={() => handleOptionClick(option)} key={option.id} >{option.label}</Dropdown.Item>
//         )
//     });
// console.log(renderedOptions);
//     return (

//     <Dropdown>
//       <Dropdown.Toggle className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" variant="success" id="dropdown-basic">
//         Vælg Materiale 1
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//       <div  >
//     <div className="py-1" >
//         {renderedOptions}
//         </div></div>
//       </Dropdown.Menu>
//     </Dropdown>


//     );
// }

// export default MaterialDropdown;