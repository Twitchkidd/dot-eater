import { useState, useEffect } from 'react';
import Head from 'next/head';
import Container from '../components/Container';
import LeaderBoard from '../components/Leaderboard';
import StartScreen from '../components/StartScreen';
import GameScreen from '../components/GameScreen';
import GameOverScreen from '../components/GameOverScreen';
import Global from '../components/Global';

const Index = () => {
	const [won, setWon] = useState(null);
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
	useEffect(() => {
		useGamepads(gamepads => setGamepads(gamepads));
	}, []);
	return (
		<Container>
			<Head>
				<title>dot-eater!</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{won === null ? (
				<>
					<StartScreen start={handleStart} />
					<LeaderBoard />
				</>
			) : won === undefined ? (
				<GameScreen
					score={score}
					onChangeScore={handleChangeScore}
					onGameOver={handleGameOver}
					onReset={handleReset}
				/>
			) : (
				<>
					<GameOverScreen won={won} score={score} handleStart={handleStart} />
					<LeaderBoard />
				</>
			)}
			<Global />
		</Container>
	);
};

export default Index;
