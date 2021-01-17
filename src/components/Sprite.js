import styled from 'styled-components';

const Sprite = styled.img`
	position: absolute;
	top: ${props => props.pos[0]}px;
	left: ${props => props.pos[1]}px;
`;

export default Sprite;
