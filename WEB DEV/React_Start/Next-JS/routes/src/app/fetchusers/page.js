import Link from "next/link";

const Page = async () => {
  const response = await fetch("http://localhost:3000/api/users");
  const users = await response.json();

  return (
    <div>
      <h1>Fetch Users</h1>

      {users.map((item) => (
        <div key={item.id}>
            <br />
          <Link href={`/fetchusers/${item.id}`}>
            {item.name}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Page;