import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from '../../assets/header.png';

const Banner = () => {
  return (
    <div className="section__container header__container">
        <div className='header__content z-30'>
            <h4 className='uppercase'>UP TO 20% Discount on</h4>
            <h1>Girl's Fashion</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita consequuntur error saepe blanditiis voluptatibus minus magnam quaerat, sint fugit quia voluptas, a quam voluptates atque sapiente ut officia cum corrupti.</p>
            <button className='btn'><Link to='/shop'>EXPLORE MORE</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner