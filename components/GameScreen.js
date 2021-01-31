import GameBoard from './GameBoard';
import Game from './Game';
import UI from './UI';

const GameScreen = ({ score, onChangeScore, onGameOver, onReset }) => (
	<GameBoard won={undefined}>
		<Game onChangeScore={onChangeScore} onGameOver={onGameOver} />
		<UI>
			<UI.Text>Score: {score}</UI.Text>
			<button onClick={onReset}>Reset!</button>
		</UI>
	</GameBoard>
);

export default GameScreen;
