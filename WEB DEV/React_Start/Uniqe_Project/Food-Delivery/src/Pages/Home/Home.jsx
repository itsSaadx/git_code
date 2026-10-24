import React, { useState } from 'react'
import "./Home.css"
import Header from '../../Comp/Header/Header'
import ExploreMenu from '../../Comp/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Comp/FoodDisplay/FoodDisplay'
import AppDownload from '../../Comp/AppDownload/AppDownload'

function Home() {
  const [category,setcategory] = useState("All")

  return (
    <div>
    <Header/>
    <ExploreMenu category={category} setcategory={setcategory}/>
    <FoodDisplay category={category}/>
    <AppDownload/>
    </div>
  )
}

export default Home
