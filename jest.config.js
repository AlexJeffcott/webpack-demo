// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '\\.png$': '<rootDir>/__mocks__/pngMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^Assets': '<rootDir>/src/assets',
    '^Components': '<rootDir>/src/components',
    '^Pages': '<rootDir>/src/pages',
  },
}
