import { useAppDispatch, useAppSelector } from '../../store/store';
import { tick } from './gameSlice';
import { Coord, handleActiveNeighbors, handleNonActiveNeighbors } from '../utils/gridUtils.ts';

export const useGameRules = () => {
	const dispatch = useAppDispatch();
	const { gridData, toggledCells } = useAppSelector((state) => state.game);

	const handleGameTick = () => {
		const toUpdate: {coords: Coord, active: boolean}[] = []
		for (const cell in toggledCells){
			const [row, col] = cell.split('-').map(Number);
			const toActivate = handleActiveNeighbors(gridData, row, col);
			const toDeactivate = handleNonActiveNeighbors(gridData, row, col);
			toUpdate.push(...toActivate, ...toDeactivate);
		}
		dispatch(tick(toUpdate));
	};

	return { handleGameTick };
};
