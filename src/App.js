import Backdrop from './components/Backdrop';
import Container from './components/Container';
import Global from './components/Global';

const App = () => {
	// hello world
	return (
		<>
			<Container>
				<Backdrop />
			</Container>
			<Global />
		</>
	);
};

export default App;
