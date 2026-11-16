'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../style.css';
import Link from 'next/link';

const Page = (props) => {
  const { editproduct } = use(props.params);
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');

  // Get selected product details
  const getProductDetails = async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/${editproduct}`
    );

    const data = await response.json();

    if (data.success && data.result) {
      setName(data.result.name || '');
      setPrice(data.result.price || '');
      setCompany(data.result.company || '');
      setCategory(data.result.category || '');
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [editproduct]);

  // Update product
  const updateProduct = async () => {
    const payload = {
      name,
      price: Number(price),
      company,
      category
    };

    const response = await fetch(
      `http://localhost:3000/api/products/${editproduct}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    if (data.success && data.result) {
      alert('Product Updated Successfully');
      router.push('/products');
      router.refresh();
    } else {
      alert('Product update failed');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Update Product</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Product Name"
        className="input"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Enter Product Price"
        className="input"
      />

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        placeholder="Enter Product Company"
        className="input"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Enter Product Category"
        className="input"
      />

      <button onClick={updateProduct} className="btn">
        Update Product
      </button>

      <Link href="/products">Go To Table</Link>
    </div>
  );
};

export default Page;