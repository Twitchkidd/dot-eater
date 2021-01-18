import { useState, useEffect } from 'react';
import { timer } from 'd3-timer';
import { useKeyPress } from '../hooks/useKeyPress';
import { initialPlayer, initialMonsters, initialDots } from './GameBoard';
import Player, { movePlayer } from './Player';
import Dots, { checkDots } from './Dots';
import Monster, { moveMonsters } from './Monster';
import Debugger from './Debugger';
// import { tweenFromDirection } from '../utils/movement';

const Game = ({ onChangeScore, onGameOver }) => {
	const [time, setTime] = useState(0);
	// const [player, setPlayer] = useState(initialPlayer);
	// const [dots, setDots] = useState(initialDots);
	// const [monsters, setMonsters] = useState(initialMonsters);
	const [sprites, setSprites] = useState({
		player: initialPlayer,
		dots: initialDots,
		monsters: initialMonsters,
	});
	const up = useKeyPress(38);
	const down = useKeyPress(40);
	const left = useKeyPress(37);
	const right = useKeyPress(39);
	const tickAnimation = () => {
		if (time % 5 === 0) {
			setTime(time => time + 5);
		}
	};
	useEffect(() => {
		if (time > 10000) return; // ! Testing
		const { player, dots, monsters } = sprites;
		// const nextMonsters = [...monsters];
		const nextPlayer = movePlayer(up, down, left, right, { ...player });
		const nextDots = checkDots(nextPlayer.tween, [...dots], onChangeScore);
		const nextMonsters = moveMonsters([...monsters]);
		setSprites(prev => ({
			...prev,
			player: nextPlayer,
			dots: nextDots,
			monsters: nextMonsters,
		}));
		// setSprites({
		// 	...sprites,
		// 	monsters: nextMonsters.map(monster => ({
		// 		...monster,
		// 		tween: tweenFromDirection('up', monster.tween),
		// 	})),
		// });
	}, [time]);
	useEffect(() => {
		const t = timer(tickAnimation);
		return function cleanup() {
			t.stop();
		};
	}, []);
	const { player, dots, monsters } = sprites;
	return (
		<>
			<Player pos={player.tween} />
			<Dots dots={dots} />
			{monsters.map((monster, i) => (
				<Monster pos={monster.tween} eaten={monster.eaten} key={i} />
			))}
			{/* <Debugger>
				{monsters.map((monster, i) => (
					<Debugger.Wrap key={i}>
						<Debugger.Text>Monster {i}</Debugger.Text>
						{Object.entries(monster)
							.filter(keyVal => keyVal[0] !== 'eaten')
							.map((keyVal, j) => (
								<Debugger.Text key={j}>
									{keyVal[0]} {keyVal[1]}
								</Debugger.Text>
							))}
					</Debugger.Wrap>
				))}
			</Debugger> */}
		</>
	);
};

export default Game;
