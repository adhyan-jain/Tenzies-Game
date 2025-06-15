import React from 'react';

const Die = ({ value, isHeld, holdDice }) => {
 
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  };

  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <h2 className="die-num">{value}</h2>
    </div>
  );
};

export default Die;