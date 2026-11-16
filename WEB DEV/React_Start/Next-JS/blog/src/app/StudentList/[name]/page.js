import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  console.log(params);

  const { name } = await params;

  if (!['1', '3', '4', 'sam'].includes(name)) {
    notFound();
  }

  return (
    <div>
      <h1>Student Details</h1>
      <h2>Student ID: {name}</h2>
    </div>
  );
}