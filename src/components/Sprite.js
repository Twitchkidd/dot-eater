import styled from 'styled-components';

const Sprite = styled.img`
	position: absolute;
	top: ${props => props.pos[0] * 40}px;
	left: ${props => props.pos[1] * 40}px;
	display: ${props => (props.eaten ? 'none' : 'block')};
`;

export default Sprite;
