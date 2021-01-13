import { useState, useEffect } from 'react';
import Container from './components/Container';
import GameBoard, { positions } from './components/GameBoard';
import Global from './components/Global';
import Player from './components/Player';
import Dots from './components/Dots';
import Monster from './components/Monster';

function arrayEquals(a, b) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
}

const App = () => {
	const [playerPosition, setPlayerPosition] = useState([9, 3]);
	const [monsterPositions, setMonsterPositions] = useState([
		[7, 7],
		[7, 8],
		[7, 9],
		[7, 10],
	]);
	const handleKeyDown = e => {
		// const up = 38;
		// const down = 40;
		// const left = 37;
		// const right = 39;
		if (e.keyCode === 38) {
			setPlayerPosition(prev =>
				positions.filter(pos => arrayEquals(pos, [prev[0] - 1, prev[1]]))
					.length > 0
					? [prev[0] - 1, prev[1]]
					: [...prev]
			);
		} else if (e.keyCode === 40) {
			setPlayerPosition(prev =>
				positions.filter(pos => arrayEquals(pos, [prev[0] + 1, prev[1]]))
					.length > 0
					? [prev[0] + 1, prev[1]]
					: [...prev]
			);
		} else if (e.keyCode === 37) {
			setPlayerPosition(prev =>
				positions.filter(pos => arrayEquals(pos, [prev[0], prev[1] - 1]))
					.length > 0
					? [prev[0], prev[1] - 1]
					: [...prev]
			);
		} else if (e.keyCode === 39) {
			setPlayerPosition(prev =>
				positions.filter(pos => arrayEquals(pos, [prev[0], prev[1] + 1]))
					.length > 0
					? [prev[0], prev[1] + 1]
					: [...prev]
			);
		}
	};
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);
	return (
		<>
			<Container>
				<GameBoard>
					<Player pos={playerPosition} />
					<Dots />
					{monsterPositions.map((monsterPosition, i) => (
						<Monster pos={monsterPosition} key={i} />
					))}
				</GameBoard>
			</Container>
			<Global />
		</>
	);
};

export default App;
