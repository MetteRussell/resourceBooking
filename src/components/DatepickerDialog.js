import { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useFetchReservedDatesForOneMaterialQuery } from '../store';

//import Button from '@mui/material/Button';
import Button from './Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Styles = styled.div`
 .react-datepicker-wrapper,
 .react-datepicker__input-container,
 .react-datepicker__input-container input {
   width: 300px;
 }
 .react-datepicker__close-icon::before,
 .react-datepicker__close-icon::after {
   background-color: red;
 }
`;

function DatePickerDialog({ onSave, material } ) {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { data, error, isFetching } = useFetchReservedDatesForOneMaterialQuery(material);
  console.log("all reserved dates", data);

  let allReserved = [];
  if (data && data.length > 0) {
    allReserved = data.map ((dateObject) => {
      return dateObject.reservedDate;
    });
  }

  const closeCalendar = false;

  const handleChange = (range) => {
    console.log("handleChange", range);
      const [startDate, endDate] = range;
      setStartDate(startDate);
      setEndDate(endDate);    
  };

  // const handleListItemClick = (value) => {
  //   console.log("handleListItemClick");
  //   onSave(value);
  // };


  const handleClickOpen = () => {
    console.log("handleClickOpen");
    //setStartDate('');
    setOpen(true);
  };

  const handleSave = () => {
    console.log("handleSave");
    setOpen(false);
    let allDates = [];
    let currentDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    console.log(currentDate, newEndDate);
    while (currentDate <= newEndDate) {
    

    allDates.push(currentDate.toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);  
    }
    
    onSave(allDates);
  };

  const handleClose = () => {
    console.log("handleClose");
    
    setOpen(false);
  };


  return (
    <div >
      <Button variant="outlined" onClick={handleClickOpen}>
          Reserver dato(er)  
      </Button>
      <Dialog 
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle>        Vælg dato(er)                    </DialogTitle>
        
        <DialogContent style={{height:'400px',width:'400px'}}>
         
          <div className="panel-block is-active overflow-visible bg-tahiti-dark">
            <Styles>
                <DatePicker className="react-datepicker-wrapper border-blue-500 bg-blue-500 text-white"
                  style={{width: 200}}
                  
                  showIcon
                  selected={startDate}
                  onChange={handleChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  excludeDates={allReserved}
         //         highlightedDates={myReservedDates}
                  shouldCloseOnSelect={closeCalendar}
                  placeholderText={'    indtast datoer    '}
                  dateFormat={"yyyy-MM-dd"}
                  isClearable

                />
            </Styles>
          </div>
        </DialogContent>
    
        <DialogActions>
          <Button onClick={handleClose} >Fortryd</Button>
          <Button onClick={handleSave} primary={true} type="submit">Gem</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
};

export default DatePickerDialog;


