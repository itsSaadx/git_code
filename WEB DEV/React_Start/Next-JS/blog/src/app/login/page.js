"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={() => router.push("/")}>
        Go to Home
      </button>

      <button onClick={() => router.push("/login/aboutlogin")}>
        Login About
      </button>

      <button onClick={() => router.push("/login/teacher-login")}>
        Teacher Login
      </button>
    </div>
  );
}