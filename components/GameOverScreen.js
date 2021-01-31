import GameBoard from './GameBoard';
import UI from './UI';
import Button from './Button';

const GameOverScreen = ({ won, score, handleStart }) => (
	<GameBoard won={won}>
		<UI>
			<UI.Wrap>
				<UI.Text report>{`${won ? 'You won!' : 'You lost!'}`}</UI.Text>
				<UI.Text report>{`Score: ${score}`}</UI.Text>
			</UI.Wrap>
			<Button start={handleStart}>Play again!</Button>
		</UI>
	</GameBoard>
);

export default GameOverScreen;
