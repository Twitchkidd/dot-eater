import { useState, useEffect } from 'react';
import {useSession} from 'next-auth/client'
import GameBoard from './GameBoard';
import UI from './UI';
import Button from './Button';

export default function GameOverScreen({ won, score, handleStart }) {
	const [session, loading] = useSession();
	const [highScore, setHighScore] = useState(null);
	useEffect(() => {
		if (session) {
			const res = await fetch(`http://localhost:3001/api/submitScore?email=${session.user.email}&version=${process.env.version}&score=${score}`, "POST");
			const highScore = await res.json();
			if (highScore.wasSet) {
				setHighScore(highScore.place)
			}
		}
	}, [])
	return (
		<GameBoard won={won}>
			<UI>
				<UI.Wrap>
					<UI.Text report>{won ? 'You won!' : 'You lost!'}</UI.Text>
					<UI.Text report>Score: {score}</UI.Text>
				</UI.Wrap>
				<Button start={handleStart}>Play again!</Button>
			</UI>
		</GameBoard>
	);
}
