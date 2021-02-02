import styled from 'styled-components';

const Wrapper = styled.div`
	margin: 0 auto;
	width: 240px;
	height: 720px;
	border: thick double var(--darker);
	display: flex;
	flex-direction: column;
	text-align: center;
`;

const Title = styled.h1`
	color: var(--lightest);
	font-family: monospace;
`;

const Version = styled(Title)`
	font-size: 18px;
`;

const Leaderboard = ({ leaderboard }) => {
	const Versions = () =>
		leaderboard.map((board, i) => (
			<React.Fragment key={i}>
				<Version>Version {board.version}</Version>
				<ol>
					{board.highScores
						.sort((a, b) => b.score - a.score)
						.map((score, j) => (
							<li key={`${j} of ${i}`}>
								{score.name} - Score: {score.score}
							</li>
						))}
				</ol>
			</React.Fragment>
		));
	return (
		<Wrapper>
			<Title>Leaderboard</Title>
			<Versions />
		</Wrapper>
	);
};

export default Leaderboard;
