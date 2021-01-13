import Sprite from './Sprite';

const Dot = ({ pos, eaten }) => (
	<Sprite
		pos={pos}
		eaten={eaten}
		src='./dot.png'
		alt='dot for dot-eater to eat'
	/>
);

export default Dot;
