// AboutSection.js
import React from 'react';
import './App.css';


const About = () => {
  return (
    <article className="ab-restaurant">
      <section className='about-restaurant'>
        <div className='text-content'>
          <h1>The Little Lemon</h1>
          <h2>Chicago</h2>
          <p className="about-subtext">
            Poo ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className='double-image'>
          <div className='about-1'>
            <img src='/MarioandAdrian.jpg' alt='Two Little Lemon Employees smiling and working behind the counter' />
          </div>
          <div className="about-2">
            <img src='/restaurant.jpg' alt='Exterior view of The Little Lemon restaurant' />
          </div>
        </div>
      </section>
    </article>
  );
}

export default About;