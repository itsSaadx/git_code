'use client'
import React from 'react'

const page = ({params}) => {
    const data = React.use(params)
    console.log(data)
  return (
    <div>
     <h1>Lectures</h1> 
     <h2>Day of College: {data.lecture[0]}</h2>

<h2>Lecture No: {data.lecture[1]}</h2>
    </div>
  )
}

export default page;
