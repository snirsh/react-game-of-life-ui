import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;

const GRID_SIZE = 30;

type GridData = boolean[][];

interface GameState {
	gridData: GridData;
	isRunning: boolean;
}

const initialState: GameState = {
	gridData: Array(GRID_SIZE)
		.fill(null)
		.map(() => Array(GRID_SIZE).fill(false)),
	isRunning: false,
};

type Coord = [number, number]
type ActiveNeighbors = Coord[]

const NEIGHBOR_COORDINATES = [
	[-1, 0], [1, 0], [0, -1], [0, 1],
	[-1, -1], [-1, 1], [1, -1], [1, 1]
]

const getNeighbors =  (gridData: GridData, row: number, col: number, active: boolean) => {
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

const getActiveNeightbors = (gridData: GridData, row: number, col: number) => {
	return getNeighbors(gridData, row, col, true);
}

const getNonActiveNeighbors = (gridData: GridData, row: number, col: number) => {
	return getNeighbors(gridData, row, col, false);
}

const toggledCells: {[key: string]: boolean} = {}

function updateToggledCells(gridData: GridData, row: number, col: number) {
	if (gridData[row][col]) {
		toggledCells[`${row}-${col}`] = gridData[row][col];
	} else {
		delete toggledCells[`${row}-${col}`];
	}
}

function handleActiveNeighbors(gridData: GridData, row: number, col: number, toUpdate: { coords: Coord; active: boolean }[]) {
	const activeNeighbors = getActiveNeightbors(gridData, row, col);
	if (activeNeighbors.length < 2 || activeNeighbors.length > 3) {
		toUpdate.push({ coords: [row, col], active: false });
	}
}

function handleNonActiveNeighbors(gridData: GridData, row: number, col: number, toUpdate: { coords: Coord; active: boolean }[]) {
	const inActiveNeighbors = getNonActiveNeighbors(gridData, row, col);
	for (const [nrow, ncol] of inActiveNeighbors) {
		const activeNeightborOfNonActive = getActiveNeightbors(gridData, nrow, ncol);
		if (activeNeightborOfNonActive.length === 3) {
			toUpdate.push({ coords: [nrow, ncol], active: true });
		}
	}
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			state.gridData[row][col] = !state.gridData[row][col];
			updateToggledCells(state.gridData, row, col);
		},
		startGame: (state) => {
			state.isRunning = true;
		},
		stopGame: (state) => {
			state.isRunning = false;
		},
		resetGame: (state) => {
			state.gridData = Array(GRID_SIZE)
				.fill(null)
				.map(() => Array(GRID_SIZE).fill(false));
			state.isRunning = false;
		},
		tick: (state) => {
			const toUpdate: {coords: Coord, active: boolean}[] = []
			for (const cell in toggledCells){
				const [row, col] = cell.split('-').map(Number);
				handleActiveNeighbors(state.gridData, row, col, toUpdate);
				handleNonActiveNeighbors(state.gridData, row, col, toUpdate);
			}
			for (const {coords, active} of toUpdate){
				state.gridData[coords[0]][coords[1]] = active;
				if(active){
					toggledCells[`${coords[0]}-${coords[1]}`] = active;
				} else {
					delete toggledCells[`${coords[0]}-${coords[1]}`];
				}
			}
		},
	},
});

export const { toggleCell, startGame, stopGame, resetGame, tick } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
