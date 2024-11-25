import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changePattern, resetGame, startGame, stopGame } from './gameSlice';
import { useGameRules } from './GameRules';
import { BLOCK, DOT, GLIDER } from '../utils/examples.ts';

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

	const handleDot = () => {
		dispatch(changePattern(DOT));
	}

	const handleBlock = () => {
		dispatch(changePattern(BLOCK));
	}

	const handleGlider = () => {
		dispatch(changePattern(GLIDER));
	}

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		if (isRunning) {
			interval = setInterval(() => {
				handleGameTick();
			}, 50);
		} else {
			if (interval) clearInterval(interval);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, dispatch, handleGameTick]);

	return { gridData, isRunning, handleStart, handleStop, handleReset, handleDot, handleBlock, handleGlider };
};
