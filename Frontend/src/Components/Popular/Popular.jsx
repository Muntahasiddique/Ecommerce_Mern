import  './Popular.css'

import Item from '../Item/Item'
import { useEffect, useState } from 'react'
const Popular = () => {
  const [PopularProducts,setPupularProducts] = useState([]);

  useEffect((()=>{
   fetch('http://localhost:4000/popularinwomen').then((response)=>response.json()).then((data)=>setPupularProducts(data))
  }),[])
  return (
    <div className='popular' >
      <h1>Popular in women</h1>
      <hr />
      <div className="popular-item">
        {PopularProducts.map((item , i)=>{
            return <Item key={i} id={item.id} name={item.name} image = {item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
