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
	const current = movingDirection(nextPlayer.tween, nextPlayer.prevTween);
	if (up || down || left || right) {
		// * If a key is down
		const keysDown = [up, down, left, right].reduce(
			(acc, bool, i) =>
				bool ? [...acc, ['up', 'down', 'left', 'right'][i]] : [...acc],
			[]
		);
		if (arrayEquals(nextPlayer.pos, nextPlayer.next)) {
			// * And we're at a junction
			if (!current) {
				// * And were still
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
			} else {
				// * Or if we're already moving
				if (keysDown.contains(current)) {
					// * If one of those keys is *in* that direction
					if (
						positions.filter(pos =>
							arrayEquals(
								pos,
								nextPositionFromDirection(current, nextPlayer.pos)
							)
						)
					) {
						// * If the direction is valid
						nextPlayer.next = nextPositionFromDirection(
							current,
							nextPlayer.pos
						);
						nextPlayer.prevTween = nextPlayer.tween;
						nextPlayer.tween = tweenFromDirection(current, nextPlayer.tween);
						return nextPlayer;
					} else {
						// * If not
						for (const key of keysDown) {
							if (
								positions.filter(pos =>
									arrayEquals(
										pos,
										nextPositionFromDirection(key, nextPlayer.pos)
									)
								).length > 0
							) {
								nextPlayer.next = nextPositionFromDirection(
									key,
									nextPlayer.pos
								);
								nextPlayer.prevTween = nextPlayer.tween;
								nextPlayer.tween = tweenFromDirection(key, nextPlayer.tween);
								return nextPlayer;
							}
						}
					}
				}
			}
		}
		if (keysDown.includes(current)) {
			// * If one of the keys down is in the current direction
			nextPlayer.prevTween = nextPlayer.tween;
			nextPlayer.tween = tweenFromDirection(current, nextPlayer.tween);
			if (arrayEquals(nextPlayer.tween, nextPlayer.next)) {
				nextPlayer.pos = nextPlayer.next;
				nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
			}
			return nextPlayer;
		} else {
			// * Or
			for (const key of keysDown) {
				if (
					positions.filter(pos =>
						arrayEquals(pos, nextPositionFromDirection(key, nextPlayer.pos))
					).length > 0
				) {
					// * If any of the directions is valid
					nextPlayer.next = nextPositionFromDirection(key, nextPlayer.pos);
					nextPlayer.tween = tweenFromDirection(key, nextPlayer.tween);
					if (nextPlayer.tween === nextPlayer.next) {
						nextPlayer.pos = nextPlayer.next;
						nextPlayer.next = nextPositionFromDirection(key, nextPlayer.pos);
					}
					return nextPlayer;
				}
				// nextPlayer.tween = tweenFromDirection(current, nextPlayer.tween);
				// if (arrayEquals(nextPlayer.tween, nextPlayer.next)) {
				// 	nextPlayer.pos = nextPlayer.next;
				// 	nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
				// }
				// return nextPlayer;
			}
		}
	} else {
		// * Or if no keys are down
		if (!arrayEquals(nextPlayer.tween, nextPlayer.next)) {
			// * If we're not at a junction
			tweenFromDirection(current, nextPlayer.tween);
			if (arrayEquals(nextPlayer.tween, nextPlayer.next)) {
				nextPlayer.pos = nextPlayer.next;
				nextPlayer.next = nextPositionFromDirection(current, nextPlayer.pos);
			}
			return nextPlayer;
		}
	}
	// * Or if we're at a junction with no keys down, the logical last state
	return nextPlayer;
};

const StyledPlayer = styled(Sprite)`
	z-index: 9001;
`;

const Player = ({ pos }) => (
	<StyledPlayer pos={pos} src='./player.png' alt='the dot-eater!' />
);

export default Player;
