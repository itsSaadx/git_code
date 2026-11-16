import Link from "next/link";
import { users } from "./data";

export default function UsersPage() {
  return (
    <div>
      <h1>All Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          <Link href={`/users/${user.id}`}>
            {user.name}
          </Link>
        </div>
      ))}
    </div>
  );
}