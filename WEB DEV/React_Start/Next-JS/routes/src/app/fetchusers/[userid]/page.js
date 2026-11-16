const Page = async ({ params }) => {
  const { userid } = await params;

  const response = await fetch(
    `http://localhost:3000/api/users/${userid}`
  );

  const userdata = await response.json();

  if (!response.ok || userdata.length === 0) {
    return <h1>User Not Found</h1>;
  }

  const user = userdata[0];

  return (
    <div>
      <h1>User Details</h1>
      <h2>Name: {user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default Page;