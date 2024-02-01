import React from 'react'

const Appbar = ({balance}) => {
  return (
    <div className='w-11/12 flex justify-between rounded-3xl shadow-sm p-5 bg-white'>
        <h1 className='font-bold text-xl'>Paytm</h1>
        <p className='font-semibold'>Balance: {balance}</p>
      
    </div>
  )
}

export default Appbar
