import React from 'react';
import styled from 'styled-components';
import Sprite from './Sprite';

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
