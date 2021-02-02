import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function updateName(req, res) {
	const session = await getSession({ req });
	if (!session) {
		res.send({
			error: 'You must be sign in to view the protected content on this page.',
		});
	} else if (req.method !== 'GET') {
		res.send({
			error: 'Wrong HTTP request!',
		});
	} else {
		const { db } = await connectToDatabase();
		const name = await db
			.collection('users')
			.findOne({ email: req.query.email });
		res.json(name);
	}
}
