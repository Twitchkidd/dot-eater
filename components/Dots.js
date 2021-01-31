import styled from 'styled-components';
import { arrayEquals } from '../utils/general';
import Sprite from './Sprite';

export const checkDots = (playerTween, dots, onChangeScore) => {
	let nextDots = [...dots];
	if (
		dots
			.filter(dot => !dot.eaten)
			.map(dot => dot.pos)
			.filter(pos => arrayEquals(playerTween, pos)).length > 0
	) {
		nextDots = dots.map(dot =>
			arrayEquals(dot.pos, playerTween) ? { ...dot, eaten: true } : dot
		);
		onChangeScore(10);
	}
	return nextDots;
};

const StyledDot = styled(Sprite)`
	display: ${props => (props.eaten ? 'none' : 'block')};
`;

const Dot = ({ pos, eaten }) => (
	<StyledDot
		pos={pos}
		eaten={eaten}
		src='./dot.png'
		alt='dot for dot-eater to eat'
	/>
);

const Dots = ({ dots }) =>
	dots.map((dot, i) => <Dot key={i} pos={dot.pos} eaten={dot.eaten} />);

export default Dots;
