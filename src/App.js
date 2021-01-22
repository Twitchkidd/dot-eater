import { useState } from 'react';
import Container from './components/Container';
import GameBoard from './components/GameBoard';
import UI from './components/UI';
import Button from './components/Button';
import Game from './components/Game';
import Global from './components/Global';

const App = () => {
	const [won, setWon] = useState(null);
	const [lives, setLives] = useState(2);
	const [score, setScore] = useState(0);
	const handleChangeScore = delta => {
		setScore(score => (score += delta));
	};
	const handleStart = () => {
		setScore(0);
		setWon(undefined);
	};
	const handleReset = () => {
		setScore(0);
		setWon(null);
	};
	const handleGameOver = wonGame => {
		setWon(wonGame);
	};
	return (
		<>
			<Container>
				<GameBoard>
					{won === null ? (
						<UI>
							<UI.Text titleText>dot-eater!</UI.Text>
							<Button start={handleStart}>Start</Button>
						</UI>
					) : won === undefined ? (
						<>
							<Game
								lives={lives}
								onChangeScore={handleChangeScore}
								onGameOver={handleGameOver}
							/>
							<UI>
								<UI.Text>Score: {score}</UI.Text>
								<button onClick={handleReset}>Reset!</button>
							</UI>
						</>
					) : (
						<UI>
							<UI.Wrap>
								<UI.Text report>{`${won ? 'You won!' : 'You lost!'}`}</UI.Text>
								<UI.Text report>{`Score: ${score}`}</UI.Text>
							</UI.Wrap>
							<Button start={handleStart}>Play again!</Button>
						</UI>
					)}
				</GameBoard>
			</Container>
			<Global />
		</>
	);
};

export default App;
