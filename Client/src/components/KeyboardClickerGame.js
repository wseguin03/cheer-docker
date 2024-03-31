import React, { useState, useEffect, useRef } from 'react';

const KeyboardClickerGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({ x: 100, y: 100, radius: 30, letter: 'A' });
  const [colour, setColour] = useState('#e5ae98');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawTarget(context, target);

    // event listener for keyboard events
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === target.letter) {
        setScore(score + 1);
        moveTarget();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [target, score]);

  const drawTarget = (context, { x, y, radius, letter }) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(letter, x, y);
  };

  const changeColour = () => {
    const colours = ['#607043', '#e5ae98', '#5e4f59', '#ea7859', '#ece9d2'];
    const randomColour = colours[Math.floor(Math.random() * colours.length)];
    setColour(randomColour);
};

  const moveTarget = () => {
    const newPos = {
      x: Math.random() * (canvasRef.current.width - 60) + 30,
      y: Math.random() * (canvasRef.current.height - 60) + 30,
      radius: 30,
      letter: getRandomLetter(),
    };
    changeColour();
    setTarget(newPos);

  };

  //to generate a random letter
  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={400} />
      <p>Score: {score}</p>
    </div>
  );
};

export default KeyboardClickerGame;
