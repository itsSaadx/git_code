import React from 'react'
import AddUsers from './components/AddUsers'
import DisplayUsers from './components/DisplayUsers'
import DisplayTodo from './components/Displaytodo'
import AddTodo from './components/AddTodo'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <AddUsers/>
      <AddTodo/>
      <DisplayUsers/>
      <DisplayTodo/>
       <div className='user_list_api'>
      <Link href="/apiusers">User List of API</Link>
      </div>
    </div>
  )
}

export default page
