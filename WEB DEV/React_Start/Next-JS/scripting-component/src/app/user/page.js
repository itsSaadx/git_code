"use client"
import React from 'react'
import Script from 'next/script'
const page = () => {
  return (
    <div>
     <Script 
    src="/location.js"  
    onLoad={()=>{
     console.log("Location loaded successfullly")
    }}
    />

      <h1>User Locaiton</h1>
    </div>
  )
}

export default page
