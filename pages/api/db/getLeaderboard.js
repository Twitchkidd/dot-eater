import { connectToDatabase } from '../utils/mongodb';

export default async (req, res) => {
	const { db } = await connectToDatabase();
	// await leaderboard
	res.json(leaderboard);
};
