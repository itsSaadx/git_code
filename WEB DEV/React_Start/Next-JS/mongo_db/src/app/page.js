import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Home Page</h1>
        <p>Welcome! Choose where you want to go.</p>

        <div className={styles.links}>
          <Link href="/products" className={styles.btn}>
            Products
          </Link>

          <Link href="/addproducts" className={styles.btn}>
            Add Products
          </Link>
        </div>
      </div>
    </div>
  );
}