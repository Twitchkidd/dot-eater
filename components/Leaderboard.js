import styled from 'styled-components';

const Wrapper = styled.div`
	min-width: 240px;
	max-width: 30%;
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

const Leaderboard = () => (
	<Wrapper>
		<Title>Leaderboard</Title>
		{/* To be a versions.map(): */}
		<Version>Version 1.1.2</Version>
		<ol>
			<li>Gareth - Score: 4200</li>
		</ol>
		<Version>Version 1.1.1</Version>
		<ol>
			<li>Lena - Score: 1080</li>
			<li>Samuel - Score: 1060</li>
			<li>Gareth - Score: 420</li>
		</ol>
	</Wrapper>
);

export default Leaderboard;
