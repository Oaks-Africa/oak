module.exports = {
  displayName: 'shared-data-access-phone-number-verification',

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
  coverageDirectory:
    '../../../../coverage/libs/shared/data-access/phone-number-verification',
  preset: '../../../../jest.preset.js',
};
