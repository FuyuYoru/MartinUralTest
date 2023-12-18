export function createRangeArray(start: number = 1, end: number, step: number = 1) {
	const result = [];
	for (let i = start; i <= end; i += step) {
		result.push(i);
	}
	return result;
}