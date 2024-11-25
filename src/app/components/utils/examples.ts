import { Coord } from './gridUtils.ts';
import { newModulo } from './mathUtil.ts';

export const createStillLive = (row: number, col: number) => {
	return createExample(row, col, BLOCK);
}
export const createOscillator = (row: number, col: number) => {
	return createExample(row, col, BLINKER);
}
export const createGlider = (row: number, col: number) => {
	return createExample(row, col, GLIDER);
}

export const DOT: Coord[] = [[0, 0]];

export const BLOCK: Coord[] = [
	[0, 0], [0, 1],
	[1, 0], [1, 1]
]

export const BLINKER: Coord[] = [
	[0, 0], [0, 1], [0, 2]
]

export const GLIDER: Coord[] = [
	[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
]

export const createExample = (row: number, col: number, pattern: Coord[]): Coord[] => {
	return pattern.map(([r, c]) => [newModulo(r + row), newModulo(c + col)]);
}
