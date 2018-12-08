module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    testResultsProcessor: 'jest-teamcity-reporter',
    testRegex: '.*\\.spec\\.tsx?$',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'packages/**/*.{ts,tsx,js,jsx}',
        '!packages/**/*.d.ts',
    ],
    moduleDirectories: [
        '.',
        'packages',
        'node_modules'
    ],
    moduleNameMapper: {

        //
        // WARNING: ORDER MATTERS
        //
        'mental-styles/(.*)': '<rootDir>/packages/mental-styles/$1',
        'mental-styles': '<rootDir>/packages/mental-styles',
        'react-mental-babel/(.*)': '<rootDir>/packages/react-mental-babel/$1',
        'react-mental-babel': '<rootDir>/packages/react-mental-babel',
        'react-mental/(.*)': '<rootDir>/packages/react-mental/$1',
        'react-mental': '<rootDir>/packages/react-mental',
    },
};