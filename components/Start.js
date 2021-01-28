import UI from './UI';
import SignIn from './SignIn';
import Button from './Button';

export default ({ start }) => (
	<UI>
		<SignIn />
		<UI.Text titleText>dot-eater!</UI.Text>
		<Button start={start}>Start</Button>
	</UI>
);
