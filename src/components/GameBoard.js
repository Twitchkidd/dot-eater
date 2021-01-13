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
	.reduce((acc, row, i) => [...acc, row.map(ordinate => [i + 1, ordinate])], [])
	.flat();

const StyledGameBoard = styled(motion.div)`
	height: 720px;
	width: 720px;
	background-image: url('./backdrop.png');
	position: relative;
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
