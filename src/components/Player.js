import styled from 'styled-components';
import {
	nextFromDirection,
	tweenFromDirection,
	isValidDirection,
	movingDirection,
} from '../utils/movement';
import { arrayEquals, shuffle } from '../utils/general';
import Sprite from './Sprite';

export const movePlayer = (up, down, left, right, player) => {
	const nextPlayer = { ...player };
	const atJunction = arrayEquals(player.pos, player.next);
	const current = movingDirection(player.tween, player.prevTween);
	const keysDown = shuffle(
		[up, down, left, right].reduce(
			(acc, bool, i) =>
				bool ? [...acc, ['up', 'down', 'left', 'right'][i]] : [...acc],
			[]
		)
	);
	let second = false;
	if (
		arrayEquals(player.prevTween, [280, 395]) &&
		arrayEquals(keysDown.sort(), ['left', 'right'].sort()) &&
		second
	)
		debugger;
	if (
		arrayEquals(player.prevTween, [280, 395]) &&
		arrayEquals(keysDown.sort(), ['left', 'right'].sort())
	) {
		second = true;
	}
	if (atJunction) {
		for (const key of keysDown) {
			if (isValidDirection(player, key)) {
				nextPlayer.next = nextFromDirection(key, player.pos);
				nextPlayer.prevTween = player.tween;
				nextPlayer.tween = tweenFromDirection(key, player.tween);
				return nextPlayer;
			}
		}
	} else {
		let possibleKeys = [];
		for (const key of keysDown) {
			if (isValidDirection(player, key)) {
				possibleKeys.push(key);
			}
		}
		if (possibleKeys.includes(current)) {
			nextPlayer.prevTween = player.tween;
			nextPlayer.tween = tweenFromDirection(current, player.tween);
			if (arrayEquals(nextPlayer.tween, player.next)) {
				nextPlayer.pos = player.next;
			}
			return nextPlayer;
		} else if (possibleKeys.filter(key => key !== current).length > 0) {
			const dir = shuffle(possibleKeys)[0];
			nextPlayer.prevTween = player.tween;
			nextPlayer.tween = tweenFromDirection(dir, player.tween);
			if (arrayEquals(nextPlayer.tween, player.next)) {
				nextPlayer.pos = player.next;
			}
			return nextPlayer;
		} else {
			nextPlayer.prevTween = player.tween;
			nextPlayer.tween = tweenFromDirection(current, player.tween);
			if (arrayEquals(nextPlayer.tween, player.next)) {
				nextPlayer.pos = player.next;
			}
			return nextPlayer;
		}
	}
	return nextPlayer;
};

const StyledPlayer = styled(Sprite)`
	z-index: 9001;
`;

const Player = ({ pos }) => (
	<StyledPlayer pos={pos} src='./player.png' alt='the dot-eater!' />
);

export default Player;
