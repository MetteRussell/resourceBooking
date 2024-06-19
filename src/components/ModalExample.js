import { useState } from 'react';
import MaterialDropDown from './MaterialDropDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

function ModalExample( {options} ) {
    console.log(options);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

 console.log(open);
 return (
 <div>
      <Button onClick={handleOpen}>Vælg materiale 2</Button>
      <Modal className="relative z-10"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MaterialDropDown options={options} />
        </Box>
      </Modal>
    </div>


  );
}

export default ModalExample;