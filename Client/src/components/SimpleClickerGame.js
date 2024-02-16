import React, { useState, useEffect, useRef } from 'react';

const SimpleClickerGame = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [target, setTarget] = useState({ x: 100, y: 100, radius: 30 });
    const [colour, setColour] = useState('red');

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        drawTarget(context, target);
    }, 
    [target]);

    const drawTarget = (context, { x, y, radius }) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // clear
        context.fillStyle = colour;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    };

    const moveTarget = () => {
        const newPos = {
            x: Math.random() * (canvasRef.current.width - 60) + 30,
            y: Math.random() * (canvasRef.current.height - 60) + 30,
            radius: 30, //  size consistent for simplicity
        };
        setTarget(newPos);
    };

    const changeColour = () => {
        const colours = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const randomColour = colours[Math.floor(Math.random() * colours.length)];
        setColour(randomColour);
    };


    const checkClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // collision detection
        if (Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2) < target.radius) {
            setScore(score + 1);
            moveTarget(); // move target to a new position after it is clicked
            changeColour();
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} width={600} height={400} onClick={checkClick} />
            <p>Score: {score}</p>
        </div>
    );
};

export default SimpleClickerGame;