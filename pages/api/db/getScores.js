import { connectToDatabase } from '../../../utils/mongodb';

export default async function getScores(req, res) {
	const { db } = await connectToDatabase();
	const { highScores } = await db
		.collection('leaderboard')
		.find({ version: req.body.version });
	res.json(highScores);
}
