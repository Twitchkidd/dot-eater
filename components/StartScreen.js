import { signIn, signOut, useSession } from 'next-auth/client';
import GameBoard from './GameBoard';
import UI from './UI';
import OptionsCard from './OptionsCard';

const StartScreen = ({ start }) => {
	const [session, loading] = useSession();
	const handleEnterOption = selected => {
		if (selected === 'play') {
			start();
		}
		if (selected === 'signOut') {
			signOut();
		}
		if (selected === 'signIn') {
			signIn();
		}
	};
	return (
		<GameBoard won={null}>
			<UI>
				<UI.Text titleText>`dot-eater!`</UI.Text>
			</UI>
			{!loading && (
				<OptionsCard session={session} enterOption={handleEnterOption} />
			)}
		</GameBoard>
	);
};

export default StartScreen;
