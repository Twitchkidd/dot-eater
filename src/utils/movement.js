import { arrayEquals } from './general';

export const nextPositionFromDirection = (dir, pos) => {
	if (dir === 'up') {
		return [pos[0] - 40, pos[1]];
	} else if (dir === 'down') {
		return [pos[0] + 40, pos[1]];
	} else if (dir === 'left') {
		return [pos[0], pos[1] - 40];
	} else if (dir === 'right') {
		return [pos[0], pos[1] + 40];
	}
};

export const tweenFromDirection = (dir, tween) => {
	const speed = 5;
	if (dir === 'up') {
		return [tween[0] - speed, tween[1]];
	} else if (dir === 'down') {
		return [tween[0] + speed, tween[1]];
	} else if (dir === 'left') {
		return [tween[0], tween[1] - speed];
	} else if (dir === 'right') {
		return [tween[0], tween[1] + speed];
	}
};

export const movingDirection = (tween, prevTween) => {
	if (arrayEquals(tween, prevTween)) return null;
	if (tween[0] === prevTween[0]) {
		if (tween[1] > prevTween[1]) {
			return 'right';
		} else {
			return 'left';
		}
	} else {
		if (tween[0] > prevTween[0]) {
			return 'down';
		} else {
			return 'up';
		}
	}
};
