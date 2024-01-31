import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signin = () => {

    const navigate = useNavigate();
    const [signinInfo, setSigninInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignin = async ()=>{
        try {
                const response = await axios.post('http://localhost:3000/api/v1/user/signin', signinInfo);  

                localStorage.setItem('token', 'Bearer '+response.data.token)
                if(response.status===200) {
                navigate('/dashboard');
                }
        } catch (error) {
            
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
  };

  const handleChange = (e)=>{
    setSigninInfo({...signinInfo, [e.target.name]:e.target.value});
  }

  useEffect(()=>{
    console.log(signinInfo)
  }, [signinInfo]);

  useEffect(()=>{
    console.log(errorMessage);
  }, [errorMessage]);

  return (
    <div className='bg-slate-400  min-h-screen p-5'>
      <div className=''>
      <div className='bg-white w-4/12 grid justify-center mx-auto border border-black rounded-md p-5 mt-20 '>
        <div className='w-72'>
          <h1 className='text-3xl font-bold flex justify-center'>Sign In</h1>
          <p className='text-sm text-center'>Enter your information to </p>
        </div>    
        <div className='my-10 grid grid-flow-row '>
        <div className='grid grid-flow-row mt-2'>
          <label className='font-semibold'>Email</label>
          <input placeholder='johndoe@gmail.com' className='border p-1 rounded-md text-sm' name='username' onChange={handleChange}></input>
        </div>
        <div className='grid grid-flow-row mt-2'>
          <label className='font-semibold'>Password</label>
          <input  className='border p-1 rounded-md text-sm' name='password' onChange={handleChange}></input>
        </div>
        {errorMessage && <span className='text-red-600 text-xs text-center mt-2'>{errorMessage}</span>}
        <div>
          <button className='border-2 bg-black border-black text-white w-full my-5 rounded-md p-2' onClick={handleSignin}>Submit</button>
        </div>
        <div>
          <button className='border-2 border-black  w-full  rounded-md p-2' onClick={()=>{navigate('/signup')}}>Signup</button>
        </div>
        </div>    
      </div>
        </div>
    </div>
  )
}

export default Signin
