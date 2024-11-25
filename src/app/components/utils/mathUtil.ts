import { GRID_SIZE } from '../game-controller/gameSlice.ts';

export const newModulo = (n: number) => (((n) % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
