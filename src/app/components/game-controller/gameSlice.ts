import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;
import {
	Coord,
	handleActiveNeighbors,
	handleNonActiveNeighbors,
	updateToggledCells,
} from '../utils/gridUtils.ts';

export const toggledCells: {[key: string]: boolean} = {}

export const GRID_SIZE = 30;

export type GridData = boolean[][];

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

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			state.gridData[row][col] = !state.gridData[row][col];
			updateToggledCells(state.gridData, row, col, toggledCells);
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
		tick: (state, payload) => {
			const toUpdate: {coords: Coord, active: boolean}[] = []
			for (const cell in toggledCells){
				const [row, col] = cell.split('-').map(Number);
				const toActivate = handleActiveNeighbors(state.gridData, row, col);
				const toDeactivate = handleNonActiveNeighbors(state.gridData, row, col);
				toUpdate.push(...toActivate, ...toDeactivate);
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
