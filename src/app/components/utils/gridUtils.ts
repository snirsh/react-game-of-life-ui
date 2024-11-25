import { GRID_SIZE, GridData } from '../game-controller/gameSlice.ts';

export type Coord = [number, number]
export type ActiveNeighbors = Coord[]

export function updateToggledCells(gridData: GridData, row: number, col: number, toggledCells: {[key: string]: boolean}) {
	if (gridData[row][col]) {
		toggledCells[`${row}-${col}`] = gridData[row][col];
	} else {
		delete toggledCells[`${row}-${col}`];
	}
}

export function handleNeighbors(gridData: GridData, row: number, col: number ): { coords: Coord; active: boolean }[] {
	const toUpdate: { coords: Coord; active: boolean }[] = [];
	const inActiveNeighbors = getNonActiveNeighbors(gridData, row, col);
	for (const [nrow, ncol] of inActiveNeighbors) {
		const activeNeightborOfNonActive = getActiveNeightbors(gridData, nrow, ncol);
		if (activeNeightborOfNonActive.length === 3) {
			toUpdate.push({ coords: [nrow, ncol], active: true });
		}
	}

	const activeNeighbors = getActiveNeightbors(gridData, row, col);
	if (activeNeighbors.length < 2 || activeNeighbors.length > 3) {
		toUpdate.push({ coords: [row, col], active: false });
	}

	return toUpdate;
}

const NEIGHBOR_COORDINATES = [
	[-1, 0], [1, 0], [0, -1], [0, 1],
	[-1, -1], [-1, 1], [1, -1], [1, 1]
]

export const getNeighbors =  (gridData: GridData, row: number, col: number, active: boolean) => {
	return NEIGHBOR_COORDINATES.reduce<ActiveNeighbors>((acc, [rowOffset, colOffset]) => {
		if (row + rowOffset < 0 || row + rowOffset >= GRID_SIZE) {
			return acc;
		}
		if (col + colOffset < 0 || col + colOffset >= GRID_SIZE) {
			return acc;
		}
		const isActive = gridData[row + rowOffset][col + colOffset];
		if (isActive === active) acc.push([row + rowOffset, col + colOffset]);
		return acc;
	}, [])
}

export const getActiveNeightbors = (gridData: GridData, row: number, col: number) => {
	return getNeighbors(gridData, row, col, true);
}

export const getNonActiveNeighbors = (gridData: GridData, row: number, col: number) => {
	return getNeighbors(gridData, row, col, false);
}
