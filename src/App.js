import { useState } from 'react';
import Container from './components/Container';
import GameBoard from './components/GameBoard';
import Global from './components/Global';
import UI from './components/UI';
import Title from './components/Title';
import Button from './components/Button';
import Game from './components/Game';
import Report from './components/Report';

const App = () => {
	const [won, setWon] = useState(null);
	const [score, setScore] = useState(0);
	const handleChangeScore = delta => {
		setScore(score => (score += delta));
	};
	const handleStart = () => {
		setScore(0);
		setWon(undefined);
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
							<Title>dot-eater!</Title>
							<Button start={handleStart}>Start</Button>
						</UI>
					) : won === undefined ? (
						<Game
							onChangeScore={handleChangeScore}
							onGameOver={handleGameOver}
						/>
					) : (
						<UI>
							<Report score={score} won={won} reset={handleStart} />
						</UI>
					)}
				</GameBoard>
			</Container>
			<Global />
		</>
	);
};

export default App;
