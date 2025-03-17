// class UtilityClass {/* ...*/}

//export const dateFunctions = new dateFunctions();


 export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  };
