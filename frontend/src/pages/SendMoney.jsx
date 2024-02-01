import React from 'react'
import { useLocation } from 'react-router-dom'
import SendMoneyCard from '../components/SendMoneyCard';

const SendMoney = () => {

    const location = useLocation();
  return (
    <div className='min-h-screen bg-slate-400 p-10'>
      <div className='my-36'>
        <SendMoneyCard user={location.state.user}></SendMoneyCard>
      </div>
      
    </div>
  )
}

export default SendMoney
