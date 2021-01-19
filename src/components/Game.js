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
		setTime(time => time + 1);
	};
	useEffect(() => {
		if (time > 10000) return; // Testing
		const { player, dots, monsters } = sprites;
		const nextPlayer = movePlayer(up, down, left, right, { ...player });
		const nextDots = checkDots(nextPlayer.tween, [...dots], onChangeScore);
		const nextMonsters = moveMonsters([...monsters]);
		setSprites(prev => ({
			...prev,
			player: nextPlayer,
			dots: nextDots,
			monsters: nextMonsters,
		}));
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
				<Debugger.Wrap>
					<Debugger.Text>Player</Debugger.Text>
					{Object.entries(player).map((keyVal, i) => (
						<Debugger.Text key={i}>
							{keyVal[0]} x:{keyVal[1][1]} y:{keyVal[1][0]}
						</Debugger.Text>
					))}
				</Debugger.Wrap>
			</Debugger> */}
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
