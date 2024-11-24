import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithState } from '../../../utils/render-with-state';
import { Counter } from '../../../../app/features/counter/Counter';
import * as counterApi from '../../../../app/features/counter/counter-api';
import { incrementByAmount } from '../../../../app/features/counter/counter-slice';
import { mockDispatch } from '../../../utils/setup';

describe('Counter', () => {
	afterEach(() => {
		cleanup();
		jest.restoreAllMocks();
	});

	it('When the state is default, should render counter with "0" value', async () => {
		renderWithState(<Counter />);
		await waitFor(() => {
			expect(screen.getByTestId('counter-component')).toBeInTheDocument();
			expect(screen.getByTestId('counter-component').firstChild?.textContent).toEqual('count is 0');
		});
	});

	it('When the state is pre-set, should render counter with pre-set value', async () => {
		renderWithState(<Counter />, { counter: { value: 3 } });
		await waitFor(() => {
			expect(screen.getByTestId('counter-component')).toBeInTheDocument();
			const counterButton = screen.getByTestId('counter-component').firstChild;
			expect(counterButton?.textContent).toEqual('count is 3');
		});
	});

	// When the state and the state change is simple, You can directly check the effect of the event on the UI
	it('When the counter button is clicked, should increment counter value', async () => {
		renderWithState(<Counter />);
		let counterButton: ChildNode | null;
		await waitFor(() => {
			expect(screen.getByTestId('counter-component')).toBeInTheDocument();
			counterButton = screen.getByTestId('counter-component').firstChild;
			expect(counterButton?.textContent).toEqual('count is 0');
		});
		act(() => {
			fireEvent.click(counterButton!);
		});
		await waitFor(() => {
			counterButton = screen.getByTestId('counter-component').firstChild;
			expect(counterButton?.textContent).toEqual('count is 1');
		});
	});

	// When the state and the state change is complicated, 
	// You might want to only check the api was triggered with the correct arguments
	it('When the counter button is clicked, should dispatch incrementAsync action', async () => {
		const apiMock = jest.spyOn(counterApi, 'fetchCount');
		renderWithState(<Counter />);
		let counterButton: ChildNode | null;
		await waitFor(() => {
			expect(screen.getByTestId('counter-component')).toBeInTheDocument();
			counterButton = screen.getByTestId('counter-component').firstChild;
			expect(counterButton?.textContent).toEqual('count is 0');
		});
		act(() => {
			fireEvent.click(counterButton!);
		});
		await waitFor(() => {
			expect(apiMock).toHaveBeenCalledWith(1);
		});
	});

	// When the state change is complicated, and you dispatch a regular action, 
	// You might want to only check the correct action was dispatched.
	it('When the counter button is clicked, should dispatch incrementAsync action', async () => {
		renderWithState(<Counter dispatchAction={incrementByAmount} />, undefined, mockDispatch);
		let counterButton: ChildNode | null;
		await waitFor(() => {
			expect(screen.getByTestId('counter-component')).toBeInTheDocument();
			counterButton = screen.getByTestId('counter-component').firstChild;
			expect(counterButton?.textContent).toEqual('count is 0');
		});
		act(() => {
			fireEvent.click(counterButton!);
		});
		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({"payload": 1, "type": "counter/incrementByAmount"}));
		});
	});
});
