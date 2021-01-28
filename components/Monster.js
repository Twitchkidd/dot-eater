import {
	movingDirection,
	nextFromDirection,
	tweenFromDirection,
	isValidDirection,
} from '../utils/movement';
import { arrayEquals, shuffle } from '../utils/general';
import Sprite from './Sprite';

export const moveMonsters = monsters =>
	monsters.map((monster, i) => {
		const nextMonster = { ...monster };
		nextMonster.prevTween = monster.tween;
		const directions = shuffle(['up', 'down', 'right', 'left']);
		const atJunction = arrayEquals(monster.pos, monster.next);
		const current = movingDirection(monster.tween, monster.prevTween);
		const turnCoefficient = 0.9;
		const turn = Math.random() * turnCoefficient > 0.5;
		const reverseCoefficient = 0.01;
		const reverse = Math.random() * reverseCoefficient > 0.5;
		if (atJunction) {
			let nextDir;
			if (!current) {
				nextDir = directions.filter(dir => isValidDirection(monster, dir))[0];
			}
			if (turn) {
				nextDir = directions.filter(
					dir => dir !== current && isValidDirection(monster, dir)
				)[0];
			} else {
				if (isValidDirection(monster, current)) {
					nextDir = current;
				} else {
					nextDir = directions.filter(dir => isValidDirection(monster, dir))[0];
				}
			}
			nextMonster.tween = tweenFromDirection(nextDir, monster.tween);
			nextMonster.next = nextFromDirection(nextDir, monster.pos);
			return nextMonster;
		} else {
			let nextDir = current;
			if (reverse) {
				if (current === 'up') {
					nextDir = 'down';
				} else if (current === 'down') {
					nextDir = 'up';
				} else if (current === 'left') {
					nextDir = 'right';
				} else if (current === 'right') {
					nextDir = 'left';
				}
			}
			nextMonster.tween = tweenFromDirection(nextDir, monster.tween);
			if (reverse) {
				if (arrayEquals(nextMonster.tween, monster.pos)) {
				} else {
					nextMonster.pos = nextFromDirection(current, monster.pos);
				}
			} else {
				if (arrayEquals(nextMonster.tween, monster.next)) {
					nextMonster.pos = monster.next;
				}
			}
			return nextMonster;
		}
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
