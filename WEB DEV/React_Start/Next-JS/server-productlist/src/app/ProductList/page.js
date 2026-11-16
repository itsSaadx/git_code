import Product from './product'

export default async function Page() {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()

  return (
    <div>
      <h1>Product List</h1>

      {data.products.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <Product price={item.price} />
        </div>
      ))}
    </div>
  )
}