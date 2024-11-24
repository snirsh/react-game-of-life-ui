import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	displayName: 'Vite-React Testing Example',
	injectGlobals: true,
	clearMocks: true,
	restoreMocks: true,
	collectCoverage: false,
	collectCoverageFrom: ['./src/app/**'],
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
			},
		],
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__tests__/mocks/file-mock.js',
		'\\.(css|less|scss|sass)$': '<rootDir>/src/__tests__/mocks/style-mock.js',
	},
	testMatch: ['<rootDir>/src/__tests__/app/**/*.spec.ts?(x)'],
	setupFilesAfterEnv: ['<rootDir>/src/__tests__/utils/setup.ts'],
	globals: {
		window: {
			location: {
				host: '',
			},
		},
	},
	coverageDirectory: 'jest-coverage',
};

export default jestConfig;
