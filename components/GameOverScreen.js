import { useEffect } from 'react';
import GameBoard from './GameBoard';
import UI from './UI';
import Button from './Button';

export default function GameOverScreen({ won, score, handleStart }) {
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
