import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

const Specials = () => {
  const menuSpecials = [
    {
      id: 1,
      name: 'Greek Salad',
      price: '$12.99',
      image: '/greek_salad.jpg',
      description: 'Crisp cucumbers, juicy tomatoes, and tangy Kalamata olives tossed with feta cheese and our signature Greek dressing. A refreshing burst of Mediterranean flavors in every bite.',
    },
    {
      id: 2,
      name: 'Bruschetta',
      price: '$5.99',
      image: '/bread.png',
      description: 'Sliced baguette topped with a farm fresh medley of diced tomatoes, fresh basil, garlic, and extra virgin olive oil. A classic Italian appetizer that pairs perfectly with any White wine!',
    },
    {
      id: 3,
      name: 'Lemon Cake',
      price: '$5.00',
      image: '/lemon_dessert.jpg',
      description: 'Indulge in the zesty delight of our lemon cake. A buttery cake that cradles a velvety lemon custard, topped with a cloud of whipped cream. Sweet, tangy, and utterly irresistible.',
    },
  ];

  // Updated settings with responsive breakpoints
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false // Hiding arrows on mobile makes swiping feel cleaner
        }
      }
    ]
  };

  return (
    <section className='menu-specials-section'>
      <div className="specials-header">
        <h2>This Week's Specials!</h2>
        <Link to="/menu" className="menu-button">Online Menu</Link>
      </div>

      <div className="custom-carousel">
        <Slider {...settings}>
          {menuSpecials.map((special) => (
            <div key={special.id} className='menu-special-card'>
              <div className='card-image-wrapper'>
                <img src={special.image} alt={special.name} className='menu-special-image' />
              </div>
              <div className='menu-special-content'>
                <div className='card-header'>
                  <h3>{special.name}</h3>
                  <span className='special-price'>{special.price}</span>
                </div>
                <p>{special.description}</p>
                <Link 
                  to={`/special/${special.name.toLowerCase().replace(/\s/g, '-')}`} 
                  className="delivery-link"
                >
                  Order a delivery ➔
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Specials;