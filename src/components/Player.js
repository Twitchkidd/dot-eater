import styled from 'styled-components';
import Sprite from './Sprite';

const StyledPlayer = styled(Sprite)`
	z-index: 9001;
`;

const Player = ({ pos }) => (
	<StyledPlayer pos={pos} src='./player.png' alt='the dot-eater!' />
);

export default Player;
