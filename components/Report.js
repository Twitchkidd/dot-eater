import styled from 'styled-components';
import Button from './Button';

const ReportText = styled.p`
	color: #fefefe;
`;

const Report = ({ score, won, reset }) => (
	<>
		<ReportText>{`${
			won ? 'You won!' : 'You lost!'
		} Score: ${score}`}</ReportText>
		<Button start={reset}>Play again</Button>
	</>
);

export default Report;
