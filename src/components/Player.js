import styled from 'styled-components';
import { positions } from './GameBoard';
import {
	nextPositionFromDirection,
	tweenFromDirection,
	movingDirection,
} from '../utils/movement';
import { arrayEquals } from '../utils/general';
import Sprite from './Sprite';

let count = 50;

export const movePlayer = (up, down, left, right, player) => {
	const nextPlayer = { ...player };
	if (count > 0) {
		count--;
		console.log(nextPlayer, count);
	}
	const current = movingDirection(nextPlayer.tween, nextPlayer.prevTween);
	if (up || down || left || right) {
		const keysDown = [up, down, left, right].reduce(
			(acc, bool, i) =>
				bool ? [...acc, ['up', 'down', 'left', 'right'][i]] : [...acc],
			[]
		);
		if (arrayEquals(nextPlayer.pos, nextPlayer.next) && !current) {
			console.log('here', count);
			console.log(nextPlayer.pos, nextPlayer.next, count);
			for (const key of keysDown) {
				if (
					positions.filter(pos =>
						arrayEquals(pos, nextPositionFromDirection(key, nextPlayer.pos))
					).length > 0
				) {
					nextPlayer.next = nextPositionFromDirection(key, nextPlayer.pos);
					nextPlayer.prevTween = nextPlayer.tween;
					nextPlayer.tween = tweenFromDirection(key, nextPlayer.tween);
					return nextPlayer;
				}
			}
		} else if (arrayEquals(nextPlayer.pos, nextPlayer.next)) {
			if (keysDown.contains(current)) {
				if (
					positions.filter(pos =>
						arrayEquals(pos, nextPositionFromDirection(current, nextPlayer.pos))
					)
				) {
					nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
					nextPlayer.prevTween = nextPlayer.tween;
					nextPlayer.tween = tweenFromDirection(current, nextPlayer.tween);
					return nextPlayer;
				} else {
					for (const key of keysDown) {
						if (
							positions.filter(pos =>
								arrayEquals(pos, nextPositionFromDirection(key, nextPlayer.pos))
							).length > 0
						) {
							nextPlayer.next = nextPositionFromDirection(key, nextPlayer.pos);
							nextPlayer.prevTween = nextPlayer.tween;
							nextPlayer.tween = tweenFromDirection(key, nextPlayer.tween);
							return nextPlayer;
						}
					}
				}
			}
		}
		if (keysDown.includes(current)) {
			nextPlayer.prevTween = nextPlayer.tween;
			nextPlayer.tween = tweenFromDirection(current, nextPlayer.tween);
			if (arrayEquals(nextPlayer.tween, nextPlayer.next)) {
				nextPlayer.pos = nextPlayer.next;
				nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
			}
			return nextPlayer;
		} else {
			for (const key of keysDown) {
				if (
					positions.filter(pos =>
						arrayEquals(pos, nextPositionFromDirection(key, nextPlayer.pos))
					).length > 0
				) {
					nextPlayer.next = nextPositionFromDirection(key, nextPlayer.pos);
					nextPlayer.tween = tweenFromDirection(key, nextPlayer.tween);
					if (nextPlayer.tween === nextPlayer.next) {
						nextPlayer.pos = nextPlayer.next;
						nextPlayer.next = nextPositionFromDirection(key, nextPlayer.pos);
					}
					return nextPlayer;
				}
				nextPlayer.tween = tweenFromDirection(current, nextPlayer.tween);
				if (arrayEquals(nextPlayer.tween, nextPlayer.next)) {
					nextPlayer.pos = nextPlayer.next;
					nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
				}
				return nextPlayer;
			}
		}
	} else {
		if (!arrayEquals(nextPlayer.tween, nextPlayer.next)) {
			tweenFromDirection(current, nextPlayer.tween);
			if (arrayEquals(nextPlayer.tween, nextPlayer.next)) {
				nextPlayer.pos = nextPlayer.next;
				nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
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
