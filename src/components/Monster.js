import { positions } from './GameBoard';
import {
	nextPositionFromDirection,
	tweenFromDirection,
	movingDirection,
} from '../utils/movement';
import { arrayEquals } from '../utils/general';
import Sprite from './Sprite';

// Fisher-Yates Shuffle Algorithm, an implementation
const shuffle = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};

let once = true;
let count = 5;

export const moveMonsters = monsters =>
	monsters.map((monster, i) => {
		// if (i === 0) {
		// 	debugger;
		// }
		const nextMonster = { ...monster };
		const current = movingDirection(nextMonster.tween, nextMonster.prevTween);
		const turnCoefficient = 0.1;
		const reverseCoefficient = 0.01;
		if (!current) {
			/* 	* First check if it hasn't moved from last turn,
			 *	which would indicate the first frame
			 * 	*/
			// if (i === 0) {
			// 	console.log(nextMonster);
			// }
			nextMonster.tween = tweenFromDirection('up', nextMonster.tween);
			return nextMonster;
		}
		if (current && arrayEquals(monster.pos, monster.next)) {
			const turn = Math.random() * turnCoefficient > 0.5;
			if (!turn) {
				if (
					positions.filter(pos =>
						arrayEquals(
							pos,
							nextPositionFromDirection(current, nextMonster.pos)
						)
					).length > 0
				) {
					nextMonster.next = nextPositionFromDirection(
						current,
						nextMonster.pos
					);
					nextMonster.prevTween = nextMonster.tween;
					nextMonster.tween = tweenFromDirection(current, nextMonster.pos);
					return nextMonster;
				}
			} else {
				const directions = shuffle(
					['up', 'down', 'left', 'right'].filter(dir => dir !== current)
				);
				for (const dir of directions) {
					if (
						positions.filter(pos =>
							arrayEquals(pos, nextPositionFromDirection(dir, nextMonster.pos))
						).length > 0
					) {
						nextMonster.next = nextPositionFromDirection(dir, nextMonster.pos);
						nextMonster.prevTween = nextMonster.tween;
						nextMonster.tween = tweenFromDirection(dir, nextMonster.pos);
						return nextMonster;
					}
				}
			}
		}
		const reverse = Math.random() * reverseCoefficient > 0.5;
		if (!reverse) {
			nextMonster.prevTween = monster.tween;
			nextMonster.tween = tweenFromDirection(current, monster.pos);
			if (arrayEquals(nextMonster.tween, monster.next)) {
				nextMonster.pos = monster.next;
				nextMonster.next = nextPositionFromDirection(current, monster.pos);
			}
			return nextMonster;
		} else {
			const dir =
				current === 'up'
					? 'down'
					: current === 'right'
					? 'left'
					: current === 'left'
					? 'right'
					: 'up';
			nextMonster.prevTween = nextMonster.tween;
			nextMonster.tween = tweenFromDirection(current, nextMonster.pos);
			if (arrayEquals(nextMonster.tween, nextMonster.pos)) {
				nextMonster.next = nextPositionFromDirection(dir, nextMonster.pos);
			}
			return nextMonster;
		}

		// const current = movingDirection(nextMonster.tween, nextMonster.prevTween);
		// const turnCoefficient = 0.1;
		// const reverseCoefficient = 0.01;
		// if (!current) {
		// 	// nextMonster.tween = tweenFromDirection('up', nextMonster.tween);
		// 	const directions = shuffle(['up', 'down', 'left', 'right']);
		// 	for (const dir of directions) {
		// 		if (
		// 			positions.filter(pos =>
		// 				arrayEquals(pos, nextPositionFromDirection(dir, nextMonster.pos))
		// 			).length > 0
		// 		) {
		// 			nextMonster.next = nextPositionFromDirection(dir, nextMonster.pos);
		// 			nextMonster.tween = tweenFromDirection(dir, nextMonster.tween);
		// 			return nextMonster;
		// 		}
		// 	}
		// }
		// if (arrayEquals(monster.pos, monster.next)) {
		// 	const turn = Math.random() * turnCoefficient > 0.5;
		// 	if (!turn) {
		// 		if (
		// 			positions.filter(pos =>
		// 				arrayEquals(
		// 					pos,
		// 					nextPositionFromDirection(current, nextMonster.pos)
		// 				)
		// 			).length > 0
		// 		) {
		// 			nextMonster.next = nextPositionFromDirection(
		// 				current,
		// 				nextMonster.pos
		// 			);
		// 			nextMonster.prevTween = nextMonster.tween;
		// 			nextMonster.tween = tweenFromDirection(current, nextMonster.pos);
		// 			return nextMonster;
		// 		}
		// 	} else {
		// 		const directions = shuffle(
		// 			['up', 'down', 'left', 'right'].filter(dir => dir !== current)
		// 		);
		// 		for (const dir of directions) {
		// 			if (
		// 				positions.filter(pos =>
		// 					arrayEquals(pos, nextPositionFromDirection(dir, nextMonster.pos))
		// 				).length > 0
		// 			) {
		// 				nextMonster.next = nextPositionFromDirection(dir, nextMonster.pos);
		// 				nextMonster.prevTween = nextMonster.tween;
		// 				nextMonster.tween = tweenFromDirection(dir, nextMonster.pos);
		// 				return nextMonster;
		// 			}
		// 		}
		// 	}
		// }
		// const reverse = Math.random() * reverseCoefficient > 0.5;
		// if (!reverse) {
		// 	nextMonster.prevTween = monster.tween;
		// 	nextMonster.tween = tweenFromDirection(current, monster.pos);
		// 	if (arrayEquals(nextMonster.tween, monster.next)) {
		// 		nextMonster.pos = monster.next;
		// 		nextMonster.next = nextPositionFromDirection(current, monster.pos);
		// 	}
		// 	return nextMonster;
		// } else {
		// 	const dir =
		// 		current === 'up'
		// 			? 'down'
		// 			: current === 'right'
		// 			? 'left'
		// 			: current === 'left'
		// 			? 'right'
		// 			: 'up';
		// 	nextMonster.prevTween = nextMonster.tween;
		// 	nextMonster.tween = tweenFromDirection(current, nextMonster.pos);
		// 	if (arrayEquals(nextMonster.tween, nextMonster.pos)) {
		// 		nextMonster.next = nextPositionFromDirection(dir, nextMonster.pos);
		// 	}
		// 	return nextMonster;
		// }
	});

const Monster = ({ pos, eaten }) => (
	<Sprite
		pos={pos}
		eaten={eaten}
		src='./monster.png'
		alt='monster that might eat dot-eater!'
	/>
);

export default Monster;
