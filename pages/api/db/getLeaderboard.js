import { connectToDatabase } from '../../../utils/mongodb';

export default async (req, res) => {
	const { db } = await connectToDatabase();
	const leaderboard = await db
		.collection('leaderboard')
		.find({})
		.sort({ version: -1 })
		.limit(3)
		.toArray();
	res.json(leaderboard);
};
