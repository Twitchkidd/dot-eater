import { useState, useEffect } from 'react';
import { timer } from 'd3-timer';
import { useKeyPress } from '../hooks/useKeyPress';
import { initialPlayer, initialMonsters, initialDots } from './GameBoard';
import Player, { movePlayer } from './Player';
import Dots from './Dots';
import Monster, { moveMonsters } from './Monster';
import { arrayEquals } from '../utils/general';

const Game = ({ handleChangeScore, handleGameOver }) => {
	const [time, setTime] = useState(0);
	const [player, setPlayer] = useState(initialPlayer);
	const [monsters, setMonsters] = useState(initialMonsters);
	const [dots, setDots] = useState(initialDots);
	const up = useKeyPress(38);
	const down = useKeyPress(40);
	const left = useKeyPress(37);
	const right = useKeyPress(39);
	const tickAnimation = () => {
		setTime(time => time + 1);
	};
	useEffect(() => {
		let nextPlayer = movePlayer(up, down, left, right, player);
		let nextDots = [...dots];
		if (!arrayEquals(player.tween, nextPlayer.tween)) {
			if (
				dots
					.filter(dot => !dot.eaten)
					.map(dot => dot.pos)
					.includes(nextPlayer.tween)
			) {
				nextDots = prev =>
					prev.map(dot =>
						arrayEquals(dot.pos, nextPlayer.tween)
							? { ...dot, eaten: true }
							: dot
					);
				handleChangeScore(10);
			}
		}
		const nextMonsters = moveMonsters(monsters);
		setPlayer(nextPlayer);
		setMonsters(nextMonsters);
		setDots(nextDots);
	}, [time]);
	useEffect(() => {
		const t = timer(tickAnimation);
		return function cleanup() {
			t.stop();
		};
	}, []);
	return (
		<>
			<Player pos={player.tween} />
			<Dots dots={dots} />
			{monsters.map((monster, i) => (
				<Monster pos={monster.tween} eaten={monster.eaten} key={i} />
			))}
		</>
	);
};

export default Game;
