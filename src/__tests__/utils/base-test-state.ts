import { cloneDeep } from 'lodash';
import { RootState } from '../../app/store/types';

const baseTestState: RootState = {
	counter: {
		value: 0,
		status: 'idle',
	},
};

export function getBaseState() {
	return cloneDeep(baseTestState);
}
