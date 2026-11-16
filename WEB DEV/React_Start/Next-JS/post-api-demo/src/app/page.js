"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);

  async function updateUser() {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    setResult(data.user);
  }

  async function deleteUser() {
    const response = await fetch("/api/users", {
      method: "DELETE",
    });

    const data = await response.json();

    alert(data.message);
    setResult(null);
  }

  return (
    <main>
      <h1>Update User Name</h1>

      <input
        type="text"
        placeholder="Enter new name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={updateUser}>Update Name</button>

      <button onClick={deleteUser}>Delete User</button>

      {result && (
        <div>
          <h2>Updated User</h2>
          <p>Name: {result.name}</p>
          <p>Age: {result.age}</p>
        </div>
      )}
    </main>
  );
}