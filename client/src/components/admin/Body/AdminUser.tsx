
import React, { useEffect, useState} from 'react';
import UserTable from './Pages/userTable';
import axios from 'axios';
import BASE_URL, { urls } from '../../../config';
import { UserDataApiResponse } from '../../../API/type/getAllUser';


const AdminUser: React.FC = () => {
  const [userData , SetUserData] = useState<UserDataApiResponse[] | null>(null)

 
  useEffect(()=>{ 
    const getUsers = async() => {
     const data: any =  await getAllUsers()
     SetUserData(data?.userData) 
    }
    getUsers();
  },[])
const getAllUsers = async()=>{
  try{

   const response = await axios.get(BASE_URL+urls.ADMIN_GET_ALL_USERS)
    
    return response.data;

  }catch(err){
    console.error(err)
  }
}

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">User Details</p>
          </div>
         
        </div>


        <UserTable  userData={userData}/>
       
            
        {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminUser;
