// import React, { useState, useEffect }  from 'react';
// import axios from 'axios';

// export default function allTherapists() {

//     const [allTherapists, setAllTherapists] = useState([]);
//     const [nameSearch, setNameSearch] = useState('');
//     const [categorySearch, setCategorySearch] = useState('');

//     const getAllTherapists = () => {
//     // get request to the server
//     axios
//       .get(`/api/crud/all-therapists`)
//       .then((response) => {
//         setAllTherapists(response.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   console.log('theTherapists', allTherapists);
//   useEffect(() => {
//     getAllTherapists();
//   }, []);



// }