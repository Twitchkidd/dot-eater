export const arrayEquals = (a, b) =>
	Array.isArray(a) &&
	Array.isArray(b) &&
	a.length === b.length &&
	a.every((val, index) => val === b[index]);

// Fisher-Yates Shuffle Algorithm, an implementation
export const shuffle = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};
