import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      title: "Greek Salad",
      cost: "12.99",
      image: "/greek_salad.jpg",
      category: "Lunch",
      description: "Our famous Greek salad of crisp romaine lettuce, olives, feta cheese, and tomatoes."
    },
    {
      id: 2,
      title: "Bruschetta",
      cost: "9.99",
      image: "/bread.png",
      category: "Breakfast",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned."
    },
    {
      id: 3,
      title: "Lemon Salmon",
      cost: "24.99",
      image: "/lemon_slamon.jpg",
      category: "Dinner",
      description: "Fresh Atlantic salmon seasoned with Mediterranean herbs and freshly squeezed lemon juice."
    },
    {
      id: 4,
      title: "Hummus Platter",
      cost: "11.50",
      image: "/hummus_platter.jpg",
      category: "Lunch",
      description: "Creamy house-made hummus served with warm pita bread and fresh garden vegetables."
    },
    {
      id: 5,
      title: "Parfait",
      cost: "7.50",
      image: "/parfait.jpg",
      category: "Breakfast",
      description: "Layers of Greek yogurt, crunchy honey granola, and fresh seasonal berries."
    },
    {
      id: 6,
      title: "Lemon Macaron",
      cost: "6.00",
      image: "/lemon_macarons.jpg",
      category: "Dessert",
      description: "Delicate French macaron shells filled with a tart, vibrant lemon curd."
    },
    {
      id: 7,
      title: "Baklava",
      cost: "8.00",
      image: "/bakalava.jpg",
      category: "Dessert",
      description: "Traditional sweet pastry made of layers of filo dough filled with chopped nuts and syrup."
    },
    /* NEW ITEM ADDED HERE */
    {
      id: 8,
      title: "Lemon Herb Greek Chicken",
      cost: "18.99",
      image: "/greek_chicken.jpg",
      category: "Dinner",
      description: "Tender grilled chicken breast smothered in a light lemon cream sauce, topped with blistered tomatoes and herbs."
    }
  ];

  const [itemQuantity, setItemQuantity] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleIncrement = (itemId) => {
    setItemQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemId]: (prevQuantity[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setItemQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemId]: Math.max((prevQuantity[itemId] || 0) - 1, 0),
    }));
  };

  const totalItems = Object.values(itemQuantity).reduce((total, quantity) => total + quantity, 0);

  // Safely communicate out to the window object if global tracking is still active
  useEffect(() => {
    if (window.updateTotalItems) {
      window.updateTotalItems(totalItems);
    }
  }, [totalItems]);

  const filteredMenu = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Package up the cart state arrays to send downstream over the router
  const currentCartData = Object.entries(itemQuantity)
    .filter(([_, quantity]) => quantity > 0) // Don't pass items with a quantity of 0
    .map(([id, quantity]) => {
      const menuItem = menuItems.find(item => item.id === parseInt(id));
      return { id: parseInt(id), quantity, ...menuItem };
    });

  return (
    <div className="menu-page" aria-label='Menu'>
      {/* Category Filter Navigation */}
      <div className="category-buttons" role='group' aria-label="Filter menu by category">
        {['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'].map((cat) => (
          <button 
            key={cat}
            className={selectedCategory === cat ? 'active' : ''} 
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Cards List Grid */}
      <div className="menu-card-container" role='menu'>
        {filteredMenu.map((item) => {
          const currentQty = itemQuantity[item.id] || 0;
          return (
            <div key={item.id} className="menu-card" role='menuitem'>
              <div className="menu-card-content">
                <img src={item.image} alt={item.title} className="menu-image" />
                <div className="menu-details">
                  <h3>{item.title}</h3>
                  <p className="menu-cost">${item.cost}</p>
                  <p>{item.description}</p>
                  
                  {/* Smart Cart Interactive Toggles */}
                  <div className="cart-actions">
                    {currentQty === 0 ? (
                      <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleIncrement(item.id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="counter">
                        <button onClick={() => handleDecrement(item.id)}>-</button>
                        <span aria-label={`Quantity: ${currentQty}`}>{currentQty}</span>
                        <button onClick={() => handleIncrement(item.id)}>+</button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Main Checkout Control Action */}
      <div className="avail-card">
        <Link
          to="/checkout"
          state={{ cartItems: currentCartData }} // Modern Router v6 structural syntax format
        >
          <button className='avail-buttons' disabled={totalItems === 0}>
            Checkout ({totalItems} items)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;