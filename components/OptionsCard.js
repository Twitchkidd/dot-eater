import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { motion, useAnimation } from 'framer-motion';
import { useKeyPress } from '../hooks/useKeyPress';

// const Form = styled(motion.form)`
// 	height: 36px;
// 	width: 52px;
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	background: #14141ddd;
// 	backdrop-filter: blur(4px);
// 	display: grid;
// 	place-items: center;
// 	z-index: 8500;
// `;

const Form = styled.div`
	height: 360px;
	width: 520px;
	padding: 12px 24px;
	position: absolute;
	top: 200px;
	left: 120px;
	background: #14141dee;
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 8500;
`;

const WelcomeText = styled.h1`
	color: var(--light);
	font-size: 38px;
	font-family: monospace;
	text-align: center;
	max-width: 18rem;
`;

const SignedInText = styled.h2`
	color: var(--light);
	font-size: 24px;
	margin-top: 0;
	font-family: monospace;
	text-align: center;
`;

const RadioContainer = styled.div`
	margin: 12px 0 24px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	user-select: none;
`;

const RadioOuterCircle = styled.div`
	width: 18px;
	height: 18px;
	min-width: 18px;
	min-height: 18px;
	border: 2px solid var(--main-green);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 12px;
	transition: all 0.1s linear;
	${props => (props.selected ? null : `border: 2px solid #666;`)}
`;

const RadioInnerCircle = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: var(--main-green);
	transition: all 0.1s linear;
	${props =>
		props.selected
			? null
			: `
	width: 0;
  height: 0;`}
`;

const Label = styled.span`
	padding-left: 8px;
	color: var(--light);
	font-size: 36px;
	font-family: monospace;
	${props => (props.selected ? `color: var(--main-green);` : null)}
`;

const Radio = ({ selected, onChange, text, value }) => (
	<RadioContainer onClick={() => onChange(value)}>
		<RadioOuterCircle selected={selected}>
			<RadioInnerCircle selected={selected} />
		</RadioOuterCircle>
		<Label selected={selected}>{text}</Label>
	</RadioContainer>
);

const OptionsCard = ({ session, enterOption }) => {
	const [selected, setSelected] = useState('play');
	const enter = useKeyPress(13);
	const up = useKeyPress(38);
	const down = useKeyPress(40);
	// const controls = useAnimation();
	const logActionId = session ? 'signOut' : 'signIn';
	const logActionTitle = session ? 'Sign Out' : 'Sign In';
	const handleChange = value => {
		setSelected(value);
	};
	useEffect(() => {
		if (enter) {
			enterOption(selected);
		}
	}, [enter]);
	useEffect(() => {
		if (up || down) {
			setSelected(selected !== 'play' ? 'play' : logActionId);
		}
	}, [up, down]);
	// useEffect(() => {
	// 	controls.start({
	// 		x: 120,
	// 		y: 200,
	// 		scale: 10,
	// 		transition: {
	// 			type: 'spring',
	// 		},
	// 	});
	// }, []);
	return (
		// <Form animate={controls}>
		<Form>
			<WelcomeText>Welcome to `dot-eater`!</WelcomeText>
			{session && (
				<SignedInText as='h1'>Signed in as {session.user.email}</SignedInText>
			)}
			<Radio
				value='play'
				selected={selected === 'play'}
				text='Play'
				onChange={handleChange}
			/>
			<Radio
				value={logActionId}
				selected={selected === logActionId}
				text={logActionTitle}
				onChange={handleChange}
			/>
		</Form>
	);
};

export default OptionsCard;
