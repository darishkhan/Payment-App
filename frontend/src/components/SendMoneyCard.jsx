import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SendMoneyCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const [details, setDetails] = useState({}); 
  useEffect(()=>{
    // console.log(user);
    setDetails({...details, to:user._id})
  }, [])

  const handleTransfer = async () => {
    try {
      console.log(details);
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",details,{
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if(response.status===200)
      {
        alert(response.data.message);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e)=>{
    setDetails({...details, amount: e.target.value});
  };

  return (
        <div className="bg-white w-4/12 grid justify-center mx-auto border border-black rounded-md p-5 mt-2 ">
          <div className="w-72">
            <h1 className="text-3xl font-bold flex justify-center">Send Money</h1>
          </div>
          <div className="grid grid-flow-col mt-5">
              <label className="font-semibold w-full">Transfering to : {`${user.firstname} ${user.lastname}`}</label>
              <p></p>
            </div>
            <div className="grid grid-flow-col mt-2">
              <label className="font-semibold">Amount:</label>
              <input
                className="border p-1 rounded-md text-sm"
                name="amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <button
                className="border-2 border-green-600 bg-green-400 text-white w-full my-5 rounded-md p-2"
                onClick={handleTransfer}
              >
                Send
              </button>
            </div>
          </div>
    
  );
};

export default SendMoneyCard;
