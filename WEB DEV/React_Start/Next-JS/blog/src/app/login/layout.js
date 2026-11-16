'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginLayout({ children }) {
    const pathName = usePathname();
  return (
    <div>
      <nav>
   {pathName !== "/login/teacher-login" && (
        <>
          <Link href="/login">Login</Link>{" | "}
          <Link href="/login/aboutlogin">About-Login</Link>{" | "}
          <Link href="/login/teacher-login">Teacher-Login</Link>
        </>
      )}
      </nav>

      <hr />

      {children}
    </div>
  );
}