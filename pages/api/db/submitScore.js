import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../utils/mongodb';

export default async (req, res) => {
	const session = await getSession({ req });

	if (session) {
		// res.send({ content: 'This is protected content. You can access this content because you are signed in.' })
		// do stuff
		res.send(req.body);
	} else {
		res.send({
			error: 'You must be sign in to view the protected content on this page.',
		});
	}
};
