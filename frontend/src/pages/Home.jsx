import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductCarousel from '../components/Products/ProductCarousel '
const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    originalPrice: 200,
    discount: "50% OFF",
    rating: 4.5,
    fit: "OVERSIZED FIT",
    images: [
      { url: "https://picsum.photos/id/10/500/400", altText: "Product 1" },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 120,
    originalPrice: 240,
    discount: "50% OFF",
    rating: 4.2,
    fit: "REGULAR FIT",
    images: [
      { url: "https://picsum.photos/id/1031/500/400", altText: "Product 2" },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 150,
    originalPrice: 300,
    discount: "50% OFF",
    rating: 4.8,
    fit: "SLIM FIT",
    images: [
      { url: "https://picsum.photos/id/1032/500/400", altText: "Product 3" },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 130,
    originalPrice: 260,
    discount: "50% OFF",
    rating: 4.0,
    fit: "LOOSE FIT",
    images: [
      { url: "https://picsum.photos/id/1050/500/400", altText: "Product 4" },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 140,
    originalPrice: 280,
    discount: "50% OFF",
    rating: 4.6,
    fit: "OVERSIZED FIT",
    images: [
      { url: "https://picsum.photos/id/1000/500/400", altText: "Product 5" },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 110,
    originalPrice: 220,
    discount: "50% OFF",
    rating: 4.3,
    fit: "REGULAR FIT",
    images: [
      { url: "https://picsum.photos/id/130/500/400", altText: "Product 6" },
    ],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 125,
    originalPrice: 250,
    discount: "50% OFF",
    rating: 4.7,
    fit: "SLIM FIT",
    images: [
      { url: "https://picsum.photos/id/1080/500/400", altText: "Product 7" },
    ],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 135,
    originalPrice: 270,
    discount: "50% OFF",
    rating: 4.1,
    fit: "LOOSE FIT",
    images: [
      { url: "https://picsum.photos/id/190/500/400", altText: "Product 8" },
    ],
  },
  {
    _id: 9,
    name: "Product 9",
    price: 145,
    originalPrice: 290,
    discount: "50% OFF",
    rating: 4.4,
    fit: "REGULAR FIT",
    images: [
      { url: "https://picsum.photos/id/200/500/400", altText: "Product 9" },
    ],
  },
  {
    _id: 10,
    name: "Product 10",
    price: 155,
    originalPrice: 310,
    discount: "50% OFF",
    rating: 4.9,
    fit: "OVERSIZED FIT",
    images: [
      { url: "https://picsum.photos/id/600/500/400", altText: "Product 10" },
    ],
  },
];

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