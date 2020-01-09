import React from 'react';

export const Card = ({ image, content }) => {
  return (
    <div class='card' style={{ width: '200px', height: '400px', 'border-radius':'20px' }}>
      <img src={image} class='card-img-top' alt='...' style={{height:'300px'}}/>
      <div class='card-body'>
        <p class='card-text'>{content}</p>
      </div>
    </div>
  );
};
