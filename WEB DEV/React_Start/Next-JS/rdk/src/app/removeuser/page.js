"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/slice'
import { useSelector } from 'react-redux'
const page = () => {
const data = useSelector((item)=>item.users)    
const dispatch = useDispatch()


  return (
    <div>
      <h1>remove user page</h1>
      <div>
       {
        data.map((item)=>(
        <div className='user'>
        <span className='itemname' >{item.name}</span>  

        <button className='removebtn' onClick={()=>dispatch(removeUser(item.id))}>remove</button>
        </div>
        ))
       }
      </div>
    </div>
  )
}

export default page
