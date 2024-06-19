

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector  } from 'react-redux';

// import { addReservationDate } from '../store';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


// function ReservationDatePicker({open, onSaveAll, value})  {
//     console.log("ReservationDatePicker");
//     console.log(value);

//     const dispatch = useDispatch();


//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
  
//     // const myReservedDates = useSelector((state) => {
//     //     return state.reservedDates;
//     // });
// //    console.log(myReservedDates);

// //    const alreadyReserved = ['2024-05-28','2024-06-01', '2024-06-02'];
//     const closeCalendar = false;
    

//     const handleChange = (range) => {
//         const [startDate, endDate] = range;
//         setStartDate(startDate);
//         setEndDate(endDate);
//       console.log(range);
//     };

//       const handleSubmit = () => {
//         console.log("handleSubmit", startDate.toLocaleDateString(), " ", endDate.toLocaleDateString());
        
          
//           // var dateArray = new Array();
//           // var currentDate = startDate.toLocaleDateString();
//           // while (currentDate <= endDate.toLocaleDateString()) {
//           //     dateArray.push(new Date (currentDate));
//           //     currentDate = currentDate.addDays(1);
//           // }

//           let dates = [];
//           let currentDate = new Date(startDate);
//           const newEndDate = new Date(endDate);

//           console.log(currentDate, " ", newEndDate);
//           while (currentDate <= newEndDate) {
            
//               dates.push(currentDate.toLocaleDateString());
//               currentDate.setDate(currentDate.getDate() + 1);
//               console.log(currentDate);
//           }

//           console.log(dates[0], dates[1], dates[2]);

//         // const action = addReservationDate(dates);
//         // dispatch(action);

//         onSaveAll(dates);
//       };

//     return (
//         <div className="car-form panel">
//           <h4 className="subtitle is-3">Vælg reservationsdato(er)</h4>	
  
//             <div className="panel-block is-active">
//                 <DatePicker 
//                   className="custom-datepicker"
//                   selected={startDate}
//                   onChange={handleChange}
//                   startDate={startDate}
//                   endDate={endDate}
//                   selectsRange
//                   excludeDates={value}
// //                  highlightedDates={myReservedDates}
//                   shouldCloseOnSelect={closeCalendar}
//                 />
//             </div>

//             <button type="submit" className="button is-primary" onClick={handleSubmit} >Gem</button>
//             <button type="reset" className="button is-link">Cancel</button>
//         </div>
//       );
//     }

// export default ReservationDatePicker;