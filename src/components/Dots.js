import React, { useState } from 'react';
import Dot from './Dot';

const initialDotPositions = [
	[2, 3, 4, 5, 6, 11, 12, 13, 14, 15],
	[2, 6, 11, 15],
	[2, 6, 7, 8, 9, 10, 11, 15],
	[2, 6, 11, 15],
	[2, 6, 11, 15],
	[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	[4, 13],
	[4, 13],
	[4, 13],
	[0, 1, 2, 3, 4, 13, 14, 15, 16, 17],
	[0, 4, 13, 17],
	[0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17],
	[0, 4, 6, 11, 13, 17],
	[0, 4, 6, 11, 13, 17],
	[0, 1, 2, 3, 4, 6, 11, 13, 14, 15, 16, 17],
	[6, 7, 8, 9, 10, 11],
];

const initialDots = initialDotPositions
	.reduce(
		(acc, row, i) => [
			...acc,
			row.map(ordinate => ({ pos: [i + 1, ordinate], eaten: false })),
		],
		[]
	)
	.flat();

const Dots = () => {
	const [dots, setDots] = useState(initialDots);
	return dots.map((dot, i) => (
		<Dot key={i} pos={dot.pos} eaten={dot.eaten} onSetDots={setDots} />
	));
};

export default Dots;
