module.exports = {
  displayName: 'shared-data-access-arkesel',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/shared/data-access/arkesel',
  preset: '../../../../jest.preset.js',
};
