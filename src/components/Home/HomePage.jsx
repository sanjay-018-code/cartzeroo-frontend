import React from 'react'

import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';

const HomePage = () => {
  return (
    <div>
      <HeroSection title="Buy iPone 14 Pro" subtitle="Experience the power of the latest iPhone 14 with our most Pro Camera ever." link='product/6a33a1ace66b5694a9d468f4' image={iphone} />
      <FeaturedProducts/>
      <HeroSection title="Build the ultimate setup" subtitle="You can add Studio Display and colour matched magin accessoris to your bag after configure your Mac mini." link='product/6a33a1ace66b5694a9d468fc' image={mac} />
    </div>
  )
}

export default HomePage
