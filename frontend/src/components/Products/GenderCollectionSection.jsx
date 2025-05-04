import React from 'react'
import { Link } from 'react-router-dom'
import mensCollectionImage from '../../assets/mens-collection.jpg'
import womensCollectionImage from '../../assets/womens-collection.webp'
import kidsCollectionImage from '../../assets/kids-collection.jpg'
function GenderCollectionSection() {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col lg:flex-row flex-wrap gap-8 p-6 items-center justify-center'>
            {/* Women's Collection */}
            <div className='relative '>
            <Link to="/collections/all?gender=Women"><img 
                src={womensCollectionImage} 
                alt="Women's Collection" 
                className='w-full h-[500px] object-cover rounded-lg mb-4' /></Link>
                
                <div className='absolute bottom-5 left-5 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Women's Collection
                    </h2>
                    <Link to="/collections/all?gender=Women"
                    className='text-gray-900 font-semibold hover:text-red-700 underline'>
                        Shop Now
                        </Link>
                </div>
            </div>
            <div className='relative'>
                <Link to="/collections/all?gender=Men">
                <img 
                src={mensCollectionImage} 
                alt="Women's Collection" 
                className='w-full h-[500px] object-cover rounded-lg mb-4' /></Link>
                <div className='absolute bottom-5 left-5 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Men's Collection
                    </h2>
                    <Link to="/collections/all?gender=Men"
                    className='text-gray-900 font-semibold hover:text-red-700 underline'>
                        Shop Now
                        </Link>
                </div>
            </div>
            <div className='relative'>
                <Link to="/collections/all?gender=Kids">
                <img 
                src={kidsCollectionImage} 
                alt="Women's Collection" 
                className='w-full h-[500px] object-cover rounded-lg mb-4' /></Link>
                <div className='absolute bottom-5 left-5 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Kid's Collection
                    </h2>
                    <Link to="/collections/all?gender=Women"
                    className='text-gray-900 font-semibold hover:text-red-700 underline'>
                        Shop Now
                        </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollectionSection