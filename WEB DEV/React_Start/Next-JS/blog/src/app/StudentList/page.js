import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <h1>Student List</h1>
      <ul>
        <li><Link href="/StudentList/1">Peter</Link></li>
        <li><Link href="/StudentList/sam">Sam</Link></li>
        <li><Link href="/StudentList/3">Bhasker</Link></li>
        <li><Link href="/StudentList/4">Allan</Link></li>
      </ul>
    </div>
  );
};

export default page;