// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, addUser} from '../store';
// import { useThunk } from '../hooks/useThunk';
// import axios from 'axios';
// import { useGetUserQuery } from '../store';

// import Skeleton from './Skeleton';
// import Button from './Button';
// import UsersListItem from './UsersListItem';

// function UserList(user) {

//       // for fetching and adding materials for a user
//       const { data, error, isFetching } = useGetUserQuery(user);
//       console.log(data);

//     const [materials, setMaterials] = useState([]);

//     const fetchMaterials = async () => {
//         console.log("fetching allMaterials");
// 		const response = await axios.get('http://localhost:3005/allMaterials');
// 		setMaterials(response.data);
// 	};

//     useEffect(() => {
// 		fetchMaterials();
//         console.log("async materaial", materials);
// 	}, [] );

//     let content;
//     if (isFetching) {
//         content =  <Skeleton times={6} className="h-10 w-full" />;
//     } else if (error) {
//         content = <div>Error fetching data ...</div>;
//     } else {
//         content = data.map((user) => {
//             return <UsersListItem key={user.id} user={user} options={materials}></UsersListItem>
            
//         });
//     };

//     return (
//         <div>
//             {content}
//         </div>
//     );
// };

// export default UserList;