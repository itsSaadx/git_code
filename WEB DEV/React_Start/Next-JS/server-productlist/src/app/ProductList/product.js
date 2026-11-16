'use client'

import c from '../c.module.css'

export default function Product({ price }) {
  console.log(c)
  return (
    <div>
      <button
        className={c.main}
        onClick={() => alert(price)}
      >
        Click me
      </button>
    </div>
  )
}