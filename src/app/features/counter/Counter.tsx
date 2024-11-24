import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCount } from './counter-selectors';
import { incrementAsync } from './counter-thunks';
import './counter.css';

export function Counter(props?: { dispatchAction?: ActionCreatorWithPayload<number> }) {
	const count = useAppSelector(selectCount);
	const dispatch = useAppDispatch();

	const onButtonClick = () => {
		if (props?.dispatchAction) {
			dispatch(props.dispatchAction(1));
		}
		dispatch(incrementAsync(1));
	};

	return (
		<div className="counter-component" data-testid="counter-component">
			<button onClick={onButtonClick}>count is {count}</button>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
		</div>
	);
}
