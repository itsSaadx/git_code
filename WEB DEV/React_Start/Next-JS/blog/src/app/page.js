import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/login">Go to Login</Link>
    </main>
  );
}