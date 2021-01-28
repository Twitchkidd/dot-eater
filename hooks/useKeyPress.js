import { useState, useEffect } from 'react';

export const useKeyPress = targetKeyCode => {
	const [keyPressed, setKeyPressed] = useState(false);
	const downHandler = ({ keyCode }) => {
		// console.log(`down: ${keyCode}`);
		if (keyCode === targetKeyCode && !keyPressed) {
			// console.log(`keyCode === targetKeyCode && !keyPressed`);
			setKeyPressed(true);
		}
	};
	const upHandler = ({ keyCode }) => {
		// console.log(`up: ${keyCode}`);
		if (keyCode === targetKeyCode) {
			// console.log(`keyCode === targetKeyCode`);
			setKeyPressed(false);
		}
	};
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);
	return keyPressed;
};
