"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await fetch("https://dummyjson.com/products");
        data = await data.json();

        setTimeout(() => {
          setList(data.products);
          setLoading(false);
        },3000);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>ProductList</h1>

      {loading ? (
        <div className="LOADER"></div>
      ) : (
        list.map((item) => (
          <h2 key={item.id}>{item.title}</h2>
        ))
      )}
    </div>
  );
};

export default Page;