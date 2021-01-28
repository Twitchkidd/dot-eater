import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const blanks = [
	[2, 3, 4, 5, 6, 11, 12, 13, 14, 15],
	[2, 6, 11, 15],
	[2, 6, 7, 8, 9, 10, 11, 15],
	[2, 6, 11, 15],
	[2, 6, 11, 15],
	[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	[4, 7, 8, 9, 10, 13],
	[4, 13],
	[3, 4, 13],
	[0, 1, 2, 3, 4, 13, 14, 15, 16, 17],
	[0, 4, 13, 17],
	[0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17],
	[0, 4, 6, 11, 13, 17],
	[0, 4, 6, 11, 13, 17],
	[0, 1, 2, 3, 4, 6, 11, 13, 14, 15, 16, 17],
	[6, 7, 8, 9, 10, 11],
];

export const positions = blanks
	.reduce(
		(acc, row, i) => [
			...acc,
			row.map(ordinate => [(i + 1) * 40, ordinate * 40]),
		],
		[]
	)
	.flat();

const initialPlayerPosition = [9, 3];

export const initialPlayer = {
	pos: initialPlayerPosition.map(p => p * 40),
	next: initialPlayerPosition.map(p => p * 40),
	tween: initialPlayerPosition.map(p => p * 40),
	prevTween: initialPlayerPosition.map(p => p * 40),
};

const initialMonsterPositions = [
	[7, 7],
	[7, 8],
	[7, 9],
	[7, 10],
];

export const initialMonsters = initialMonsterPositions.map(position => ({
	pos: position.map(p => p * 40),
	next: position.map(p => p * 40),
	tween: position.map(p => p * 40),
	prevTween: position.map(p => p * 40),
	eaten: false,
}));

const initialDotPositions = [
	[2, 3, 4, 5, 6, 11, 12, 13, 14, 15],
	[2, 6, 11, 15],
	[2, 6, 7, 8, 9, 10, 11, 15],
	[2, 6, 11, 15],
	[2, 6, 11, 15],
	[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	[4, 13],
	[4, 13],
	[4, 13],
	[0, 1, 2, 3, 4, 13, 14, 15, 16, 17],
	[0, 4, 13, 17],
	[0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17],
	[0, 4, 6, 11, 13, 17],
	[0, 4, 6, 11, 13, 17],
	[0, 1, 2, 3, 4, 6, 11, 13, 14, 15, 16, 17],
	[6, 7, 8, 9, 10, 11],
];

export const initialDots = initialDotPositions
	.reduce(
		(acc, row, i) => [
			...acc,
			row.map(ordinate => ({
				pos: [(i + 1) * 40, ordinate * 40],
				eaten: false,
			})),
		],
		[]
	)
	.flat();

const StyledGameBoard = styled(motion.div)`
	height: 720px;
	width: 720px;
	background-image: url('./backdrop.png');
	position: relative;
	outline: 12px double var(--darker);
`;

const GameBoard = ({ children }) => {
	const controls = useAnimation();
	const wobble = () => {
		controls.start({
			scale: 1,
			transition: {
				type: 'spring',
				velocity: 5,
				stiffness: 900,
				damping: 80,
			},
		});
	};
	return (
		<StyledGameBoard animate={controls} onClick={wobble}>
			{children}
		</StyledGameBoard>
	);
};

export default GameBoard;
