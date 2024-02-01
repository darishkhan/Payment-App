import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e)=>{
    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${e.target.value}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setAllUsers(response.data.user);
  };

  const fetchUserlist = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setAllUsers(response.data.user);
  };

  useEffect(() => {
    fetchUserlist();
  }, []);

  useEffect(()=>{
    console.log(allUsers);
  }, [allUsers])

  return (
    <div className="w-11/12 shadow-sm p-5 rounded-xl bg-white">
      <h1 className="font-semibold my-2">Users</h1>
      <input
        className="p-2 px-5 border w-full rounded-3xl"
        placeholder="Search"
        onChange={handleSearch}
      ></input>
      <div className="shadow-sm border mt-5 ">
        {allUsers.map((user) => (
          <div className="m-2 p-1 px-20 border rounded-md flex justify-between" key={user.username}>
            <div className="flex">
            <div className="w-48">{`${user.firstname} ${user.lastname}`}</div>
            <div className="">{user.username}</div>
            </div>
            <div>
              <button className="bg-green-400 px-5 py-1 rounded-md" onClick={()=>{navigate('/send', {state:{user:user}})}}>
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
