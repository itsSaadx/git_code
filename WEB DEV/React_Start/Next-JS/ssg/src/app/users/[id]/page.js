import { users } from "../data";
import { notFound } from "next/navigation";

// Build time par har user ki ID ke liye page generate karo
export function generateStaticParams() {
  return users.map((user) => ({
    id: user.id,
  }));
}

// Sirf generate kiye gaye IDs allow karo
export const dynamicParams = false;

export default async function UserDetails({ params }) {
  const { id } = await params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>User Details</h1>

      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Address: {user.address}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}