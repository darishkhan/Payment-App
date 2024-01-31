import React from 'react'

const Appbar = ({balance}) => {
  return (
    <div className='w-11/12 flex justify-between rounded-3xl shadow-sm p-5'>
        <h1>Paytm</h1>
        <p>Balance: {balance}</p>
      
    </div>
  )
}

export default Appbar
