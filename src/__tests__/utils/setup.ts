// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import '@testing-library/jest-dom';
import * as matchers from 'jest-extended';

expect.extend(matchers);

Object.defineProperty(window, 'location', {
	configurable: true,
	value: { reload: jest.fn() },
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

export const mockConsoleLog = jest.spyOn(global.console, 'log').mockImplementation(() => {});

export const mockConsoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

export const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {});

export const mockWindowAlert = jest.spyOn(global.window, 'alert').mockImplementation(() => undefined);

export const mockDispatch = jest.fn();
