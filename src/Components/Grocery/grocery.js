import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroceriesList.css";

const GroceriesList = ({ token }) => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get("https://groceries-i18z.onrender.com/api/groceries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroceries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching groceries:", error);
        setLoading(false);
      }
    };

    fetchGroceries();
  }, [token]);

  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    
    <ul class="cards">
      {groceries.map((item, index) => (
        <li key={index}>
          <a href="#" className="card" onClick={() => toggleCard(index)}>
            {/* <div className="card__image">
              <img src={item.image} alt="" />
            </div> */}
            <img src="https://i.imgur.com/oYiTqum.jpg" class="card__image" alt="" />
            <div className="card__overlay">
              <div className="card__header">
              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
          <div class="card__header-text">    
                <h3 className="card__title">{item.itemName}</h3>
                
                
                <span className="card__min-price">Min Price: {item.minPrice}</span>
              </div>
              </div>
             
                <div className="card__description">
                <span className="card__quantity">Quantity: {item.quantity}</span>
                <span className="card__expiration">Expiration: {item.expirationDate}</span>
                
                  {/* <P>Bids</p> */}
                  {/* {item.bids.map((bid, bidIndex) => (
                    <div key={bidIndex}>
                      <p>Amount: {bid.amount}</p>
                      <p>Status: {bid.status}</p>
                    </div>
                  ))} */}
                 
                    <span ClassName="No_of_bids" >Number of Bids: {item.bids.length}</span>

                </div>
              
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default GroceriesList;
