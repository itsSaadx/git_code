import Link from "next/link";
import styles from "./product.module.css";
import DeleteButton from "./DeleteButton";

const getProducts = async () => {
  const response = await fetch(
    "http://localhost:3000/api/products",
    { cache: "no-store" }
  );

  const data = await response.json();

  if (data.success) {
    return data.result;
  }

  return [];
};

const Page = async () => {
  const products = await getProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product List</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Color</th>
            <th>Company</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.color || "-"}</td>
              <td>{item.company}</td>
              <td>{item.category}</td>

              <td>
                <Link
                  className={styles.edit}
                  href={`/products/${item._id}`}
                >
                  Edit
                </Link>

                <DeleteButton   id={item._id} />
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="6" className={styles.empty}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;