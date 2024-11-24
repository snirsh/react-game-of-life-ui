import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { merge } from 'lodash';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { getCounterSlice } from '../../app/features/counter/counter-slice';
import { RootState } from '../../app/store/types';
import { getBaseState } from './base-test-state';
import { DeepPartial } from './testing-types';

export function renderWithState(component: ReactNode, stateOverrides?: DeepPartial<RootState>, dispatchOverride?: typeof jest.fn) {
	let state = getBaseState();

	if (stateOverrides) {
		state = merge(state, stateOverrides);
	}

	const store = configureStore({
		reducer: {
			counter: getCounterSlice(state.counter).reducer,
		},
	});

	if (dispatchOverride) {
		store.dispatch = dispatchOverride;
	}

	return render(<Provider store={store}>{component}</Provider>);
}
