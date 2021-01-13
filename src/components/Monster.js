import Sprite from './Sprite';

const Monster = ({ pos, eaten }) => (
	<Sprite
		pos={pos}
		eaten={eaten}
		src='./monster.png'
		alt='monster that might eat dot-eater!'
	/>
);

export default Monster;
