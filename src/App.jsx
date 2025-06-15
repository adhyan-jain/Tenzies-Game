import React, { useState, useEffect } from 'react';
import Die from './components/Die';
import Confetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';
import { nanoid } from 'nanoid';

const App = () => {
  
  const { width, height } = useWindowSize();

  const generateNewDie = () => ({
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
  });

  const allNewDice = () => Array.from({ length: 10 }, generateNewDie);

  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstVal = dice[0].value;
    const allSame = dice.every(die => die.value === firstVal);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice(oldDice => oldDice.map(
        die => die.isHeld ? die : generateNewDie()
      ));
    }
  };

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(
      die => die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ));
  };

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="app">
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;