"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice";
import Link from "next/link";

export default function AddUsers() {
  const [name, setName] = useState("");
  const dispatch = useDispatch()

  const userDispatch = () => {
    dispatch(addUser(name));
  };

  return (
    <div className="user-box">
      <h3>Add User</h3>

      <input
        type="text"
        placeholder="Add User"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="add" onClick={userDispatch}>Add</button>
      <Link className="link" href="/removeuser">remove user</Link>
    </div>
  );
}