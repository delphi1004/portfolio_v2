module.exports = {
  'moduleNameMapper': {
    '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|JPG|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/dist/'
  ],
  setupFiles: ['<rootDir>/__mocks__/setupTests.js'],
}