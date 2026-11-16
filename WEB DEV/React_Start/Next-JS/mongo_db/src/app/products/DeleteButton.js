'use client';

import { useRouter } from 'next/navigation';
import style from "./product.module.css";

const DeleteButton = ({ id }) => {
  const router = useRouter();

  const deleteProduct = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      const response = await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();

      if (data.success) {
        alert('Product Deleted Successfully');
        router.refresh();
      }
    }
  };

  return (
    <button className={style.delete} onClick={deleteProduct}>
      Delete
    </button>
  );
};

export default DeleteButton;