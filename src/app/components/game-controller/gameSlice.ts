import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			state.gridData[row][col] = !state.gridData[row][col];
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
			console.warn('tick is not implemented', {
				state,
				payload,
			});
		},
	},
});

export const { toggleCell, startGame, stopGame, resetGame, tick } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
