import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function updateName(req, res) {
	const session = await getSession({ req });
	if (!session) {
		res.send({
			error: 'You must be sign in to view the protected content on this page.',
		});
	} else if (req.method !== 'POST') {
		res.send({
			error: 'Wrong HTTP request!',
		});
	} else if (req.body.content.length <= 0) {
		res.redirect(422, 'http://localhost:3001/setName');
	} else {
		const { db } = await connectToDatabase();
		const updated = await db.users.updateOne(
			{ email: req.session.user.email },
			{ $set: { name: req.body.name }, $currentDate: { lastModified: true } }
		);
		res.json(updated);
	}
}
