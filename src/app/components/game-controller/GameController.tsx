import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { resetGame, startGame, stopGame } from './gameSlice';
import { useGameRules } from './GameRules';

export const useGameController = () => {
	const dispatch = useAppDispatch();
	const { gridData, isRunning } = useAppSelector((state) => state.game);
	const { handleGameTick } = useGameRules();

	const handleStart = () => {
		dispatch(startGame());
	};

	const handleStop = () => {
		dispatch(stopGame());
	};

	const handleReset = () => {
		dispatch(resetGame());
	};

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		if (isRunning) {
			interval = setInterval(() => {
				handleGameTick();
			}, 100);
		} else {
			if (interval) clearInterval(interval);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, dispatch, handleGameTick]);

	return { gridData, isRunning, handleStart, handleStop, handleReset };
};
