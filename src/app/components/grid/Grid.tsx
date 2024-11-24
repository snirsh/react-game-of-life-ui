// src/components/Grid.tsx
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../store/store';
import { toggleCell } from '../game-controller/gameSlice';
import './Grid.css';

interface GridProps {
	gridData: boolean[][];
}

export const Grid: React.FC<GridProps> = ({ gridData: gridData }) => {
	const dispatch = useAppDispatch();

	const handleToggleCell = useCallback(
		(row: number, col: number) => {
			dispatch(toggleCell({ row, col }));
		},
		[dispatch],
	);

	return (
		<div className="grid">
			{gridData.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((cell, colIndex) => (
						<div
							key={colIndex}
							className={`cell ${cell ? 'alive' : 'dead'}`}
							onClick={() => handleToggleCell(rowIndex, colIndex)}
						></div>
					))}
				</div>
			))}
		</div>
	);
};
