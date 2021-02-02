import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb';
import getScores from './getScores';

export default async function sumbitScore(req, res) {
	const session = await getSession({ req });
	if (req.method !== 'POST') {
		res.send({
			error: 'Wrong HTTP method!',
		});
	} else if (!session) {
		res.send({
			error: 'You must be sign in to submit a high score!',
		});
	} else {
		const { db } = await connectToDatabase();
		const { scoreSubmission } = req.body;
		const highScores = await getScores(scoreSubmission.version);
		if (scoreSubmission.score > highScores[highScores.length].score) {
			// mongo.pop the last one off
			const removed = await db.leaderboard.update({
				version: scoreSubmission.version,
			});
			// get the right index
			// insert
			// return new leaderboard
		} else {
			// if not high score, return that there's no change
		}
		// TODO (update leaderboard component)
	}
}
