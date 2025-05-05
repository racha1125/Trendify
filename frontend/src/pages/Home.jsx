import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductCarousel from '../components/Products/ProductCarousel '
const placeholderProducts = [
  {
      _id:1,
      name:"Product 1",
      price:100,
      images:[{url:"https://picsum.photos/id/10/500/400", alText:"Product 1"},]
  },
  {
      _id:2,
      name:"Product 2",
      price:100,
      images:[{url:"https://picsum.photos/id/1031/500/400", alText:"Product 1"},]
  },
  {
      _id:3,
      name:"Product 3",
      price:100,
      images:[{url:"https://picsum.photos/id/1032/500/400", alText:"Product 1"},]
  },
  {
      _id:4,
      name:"Product 4",
      price:100,
      images:[{url:"https://picsum.photos/id/1050/500/400", alText:"Product 1"},]
  },
  {
    _id:5,
    name:"Product 5",
    price:100,
    images:[{url:"https://picsum.photos/id/1000/500/400", alText:"Product 1"},]
  },
  {
    _id:6,
    name:"Product 6",
    price:100,
    images:[{url:"https://picsum.photos/id/130/500/400", alText:"Product 1"},]
  },
  {
    _id:7,
    name:"Product 7",
    price:100,
    images:[{url:"https://picsum.photos/id/1080/500/400", alText:"Product 1"},]
  },
  {
    _id:8,
    name:"Product 8",
    price:100,
    images:[{url:"https://picsum.photos/id/190/500/400", alText:"Product 1"},]
  },
]
function Home() {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/* Best Seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetails/>
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductCarousel products={placeholderProducts}/>
        </div>
    </div>
  )
}

export default Home