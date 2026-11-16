'use client';

import React, { useState } from 'react';
import '../style.css';

const Page = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');

  const addProduct = async () => {
    try {
      const result = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          color,
          company,
          category,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || 'Failed to add product');
      }

      console.log('Product added:', data);
      alert('Product added successfully!');

      // Clear all inputs
      setName('');
      setPrice('');
      setColor('');
      setCompany('');
      setCategory('');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Something went wrong!');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Add Products</h1>

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
        value={color}
        onChange={(e) => setColor(e.target.value)}
        type="text"
        placeholder="Enter Product Color"
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

      <button onClick={addProduct} className="btn">
        Add Product
      </button>
    </div>
  );
};

export default Page;