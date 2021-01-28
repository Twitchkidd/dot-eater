import { useState } from 'react';
import { connectToDatabase } from '../utils/mongodb';
import Head from 'next/head';
import Container from '../components/Container';
import GameBoard from '../components/GameBoard';
import LeaderBoard from '../components/LeaderBoard';
import UI from '../components/UI';
import Game from '../components/Game';
import Global from '../components/Global';
import Start from '../components/Start';
import GameOver from '../components/GameOver';

export default function Index({ isConnected }) {
	const [won, setWon] = useState(null);
	const [score, setScore] = useState(0);
	const handleChangeScore = delta => {
		setScore(score => (score += delta));
	};
	// won of null is the before state
	// won of undefined is playing
	// won of true or false is game over
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
			<Head>
				<title>dot-eater!</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Container>
				<GameBoard won={won}>
					{won === null ? (
						<Start start={handleStart} />
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
						<GameOver won={won} score={score} handleStart={handleStart} />
					)}
				</GameBoard>
			</Container>
			<Global />
		</>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
	};
}
