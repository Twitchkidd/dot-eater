import UI from './UI';

export default ({ won, score, handleStart }) => (
	<UI>
		<UI.Wrap>
			<UI.Text report>{`${won ? 'You won!' : 'You lost!'}`}</UI.Text>
			<UI.Text report>{`Score: ${score}`}</UI.Text>
		</UI.Wrap>
		<Button start={handleStart}>Play again!</Button>
	</UI>
);
