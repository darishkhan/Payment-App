import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import axios from 'axios'
import UserList from '../components/UserList';

const Dashboard = () => {
    const [balance, setBalance] = useState();

    const getBalance = async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers:{
                'Authorization': localStorage.getItem('token')
        }});    
        setBalance(response.data.balance.toFixed(2));
    }

    useEffect(()=>{
        getBalance();        
    }, []);

    useEffect(()=>{
        console.log(balance);
    }, [balance])

  return (
    <div className='bg-slate-400 px-20 min-h-screen'>
    <div className='flex justify-center p-5'>
        <Appbar balance={balance}></Appbar>
      
    </div>
    <div className='flex justify-center p-5'>
        <UserList ></UserList>
    </div>
    </div>
  )
}

export default Dashboard
