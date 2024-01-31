import React from 'react'

const UserList = ({handleSearch}) => {
  return (
    <div className='w-11/12 shadow-sm p-5 rounded-xl'>
        <h1 className='font-semibold my-2'>Users</h1>
        <input className='p-2 px-5 border w-full rounded-3xl' placeholder='Search' onChange={handleSearch}></input>
      
    </div>
  )
}

export default UserList
