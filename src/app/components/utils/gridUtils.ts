import { GridData } from '../game-controller/gameSlice.ts';
import { newModulo } from './mathUtil.ts';

export type Coord = [number, number]
export type ActiveNeighbors = Coord[]
export type CellsToUpdate = {coords: Coord, active: boolean}[]

const NEIGHBOR_COORDINATES = [
	[-1, 0], [1, 0], [0, -1], [0, 1],
	[-1, -1], [-1, 1], [1, -1], [1, 1]
]

export function updateToggledCells(gridData: GridData, row: number, col: number, toggledCells: {[key: string]: boolean}) {
	if (gridData[row][col]) {
		toggledCells[`${row}-${col}`] = gridData[row][col];
	} else {
		delete toggledCells[`${row}-${col}`];
	}
}

export function handleNeighbors(gridData: GridData, row: number, col: number ): CellsToUpdate {
	const toUpdate: CellsToUpdate = [];
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

export const getNeighbors =  (gridData: GridData, row: number, col: number, active: boolean) => {
	return NEIGHBOR_COORDINATES.reduce<ActiveNeighbors>((acc, [rowOffset, colOffset]) => {
		const newRow = newModulo(row + rowOffset);
		const newCol = newModulo(col + colOffset);
		const isActive = gridData[newRow][newCol];
		if (isActive === active) acc.push([newRow, newCol]);
		return acc;
	}, [])
}

export const getActiveNeightbors = (gridData: GridData, row: number, col: number) => {
	return getNeighbors(gridData, row, col, true);
}

export const getNonActiveNeighbors = (gridData: GridData, row: number, col: number) => {
	return getNeighbors(gridData, row, col, false);
}
