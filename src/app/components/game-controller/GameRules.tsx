import { useAppDispatch, useAppSelector } from '../../store/store';
import { tick } from './gameSlice';

export const useGameRules = () => {
	const dispatch = useAppDispatch();
	const { gridData } = useAppSelector((state) => state.game);

	const handleGameTick = () => {
		dispatch(tick(gridData));
	};

	return { handleGameTick };
};
