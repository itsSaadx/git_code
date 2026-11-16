"use client"
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slice";

const DisplayUsers = () => {
  const userdata = useSelector((data)=>data.userdata.users)
  const dispatch = useDispatch();
  console.log(userdata)
  return (
    <div className="user-box">
      <h3>User List</h3>
      {
        userdata.map((item)=>(
       <div
       className="user-item">{item.name} 
       <button onClick={()=>dispatch(removeUser(item.id))} className="remove">Remove</button>
       </div> 
        ))
      }
    </div>
  );
};

export default DisplayUsers;