import React from 'react'
import heroImage from '../../assets/heroImg.webp'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <section className='relative w-full overflow-hidden'>
      <img src={heroImage} alt="" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-center text-white p-6 relative'>
          <h1 className='text-4xl md:text-8xl font-bold tracking-tighter mb-4 uppercase'>VACATION <br /> Ready</h1>
          <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore our vacation-ready outfits with fast worldwide shipping.</p>
          <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>Shop Now</Link>
        </div>
      </div> 
    </section>
  )
}

export default Hero