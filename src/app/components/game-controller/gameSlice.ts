import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	Coord,
	updateToggledCells,
} from '../utils/gridUtils.ts';
import { createExample, DOT } from '../utils/examples.ts';

export const GRID_SIZE = 40;

export type GridData = boolean[][];

interface GameState {
	gridData: GridData;
	isRunning: boolean;
	toggledCells: {[key: string]: boolean}
	selectedPattern: Coord[];
}

const initialState: GameState = {
	gridData: Array(GRID_SIZE)
		.fill(null)
		.map(() => Array(GRID_SIZE).fill(false)),
	isRunning: false,
	toggledCells: {},
	selectedPattern: DOT
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			const { selectedPattern, gridData, toggledCells } = state;
			const calculatedPattern = createExample(row, col, selectedPattern);
			for (const [r, c] of calculatedPattern) {
				gridData[r][c] = !gridData[r][c];
				updateToggledCells(gridData, r, c, toggledCells);
			}
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
			state.toggledCells = {};
		},
		changePattern: (state, action: PayloadAction<Coord[]>) => {
			state.selectedPattern = action.payload;
		},
		tick: (state, payload: PayloadAction<{coords: Coord, active: boolean}[]>) => {
			const toUpdate = payload.payload;
			for (const {coords, active} of toUpdate){
				state.gridData[coords[0]][coords[1]] = active;
				if(active){
					state.toggledCells[`${coords[0]}-${coords[1]}`] = active;
				} else {
					delete state.toggledCells[`${coords[0]}-${coords[1]}`];
				}
			}
		},
	},
});

export const { toggleCell, startGame, stopGame, resetGame, changePattern, tick } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
