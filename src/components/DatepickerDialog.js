import { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useFetchReservedDatesForOneMaterialQuery } from '../store';
import { formatDate } from '../utilities/dateFunctions';
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
 .react-datepicker {
  background-color: white;
 }
 .react-datepicker__calendar-icon {
  fill: black;
 }
 .react-datepicker__day--disabled {
   color: red;
   background-color: rgba(33, 107, 165, 0.5);
 }
`;

function DatePickerDialog({ onSave, material } ) {

  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);


  const { data, error, isFetching } = useFetchReservedDatesForOneMaterialQuery(material);
  console.log("all reserved dates", data);

  let allReserved = [];
  if (data && data.length > 0) {
    allReserved = data.map ((dateObject) => {
      return dateObject.reservedDate;
    });
  }

  const closeCalendar = false;

  const handleChange = (date) => {
    
    setMessage(null);
    if (formatDate(date) < formatDate(new Date())) {
      setMessage("Dato er invalid");
    }
    setDate(date);
  
  };

 


  const handleClickOpen = () => {
    console.log("handleClickOpen");
    setDate(null);
    setOpen(true);
    setMessage();
  };

  const handleSave = () => {
    console.log("handleSave");
    setOpen(false);
    let allDates = [];
    let currentDate = new Date(date);

    onSave(date);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button primary rounded onClick={handleClickOpen}>
          Reserver dato
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle>Vælg dato</DialogTitle>
        <h3 className="pl-7 text-sm">{message}</h3>
        <DialogContent style={{height:'400px'}}>
         
          <div className="mx-auto">
            <Styles>
                <DatePicker className="react-datepicker-wrapper border-blue-500 bg-blue-300 placeholder-white"
                  style={{width: 200}}
                  
                  showIcon
                  selected={date}
                  onChange={handleChange}
 //                 startDate={startDate}
//                  endDate={endDate}
 //                 selectsRange
                  excludeDates={allReserved}
         //         highlightedDates={myReservedDates}
                  shouldCloseOnSelect={closeCalendar}
                  placeholderText={'    indtast dato    '}
                  dateFormat={"yyyy-MM-dd"}
                  isClearable

                />
            </Styles>
          </div>
          
        </DialogContent>
    
        <DialogActions>
          <Button onClick={handleClose} secondary rounded>Fortryd</Button>
          <Button loading={message} onClick={handleSave} primary rounded type="submit">Gem</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
};

export default DatePickerDialog;


