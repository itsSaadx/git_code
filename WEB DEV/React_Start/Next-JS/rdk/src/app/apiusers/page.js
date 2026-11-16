"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiUsers } from "../redux/slice";

const Page = () => {
  const dispatch = useDispatch();

  const apiUsersData = useSelector(
    (data) => data.userdata.userAPIData
  );

  const isLoading = useSelector(
    (data) => data.userdata.isLoading
  );

  const error = useSelector(
    (data) => data.userdata.error
  );

  useEffect(() => {
    dispatch(fetchApiUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>User List From REST API</h1>

      <button onClick={() => dispatch(fetchApiUsers())}>
        Load Users
      </button>

      {isLoading && <p>Loading users...</p>}

      {error && <p>{error}</p>}

      {apiUsersData.map((item) => (
        <h4 key={item.id}>{item.name}</h4>
      ))}
    </div>
  );
};

export default Page;