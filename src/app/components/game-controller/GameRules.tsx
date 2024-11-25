import { useAppDispatch, useAppSelector } from '../../store/store';
import { tick } from './gameSlice';
import type { CellsToUpdate } from '../utils/gridUtils.ts';
import { handleNeighbors } from '../utils/gridUtils.ts';

export const useGameRules = () => {
	const dispatch = useAppDispatch();
	const { gridData, toggledCells } = useAppSelector((state) => state.game);

	const handleGameTick = () => {
		const toUpdate: CellsToUpdate = []
		for (const cell in toggledCells){
			const [row, col] = cell.split('-').map(Number);
			toUpdate.push(...handleNeighbors(gridData, row, col));
		}
		dispatch(tick(toUpdate));
	};

	return { handleGameTick };
};
