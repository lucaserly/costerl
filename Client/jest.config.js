module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/src/**/*.ts', '**/src/**/*.js'],
  moduleDirectories: ['node_modules', 'utils', __dirname],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
