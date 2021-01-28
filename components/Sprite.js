import styled from 'styled-components';

const Sprite = styled.img.attrs(props => ({
	style: {
		top: `${props.pos[0]}px`,
		left: `${props.pos[1]}px`,
	},
}))`
	position: absolute;
`;

export default Sprite;
