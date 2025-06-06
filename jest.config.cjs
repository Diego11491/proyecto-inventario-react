// jest.config.cjs
module.exports = {
    testEnvironment: "jest-environment-jsdom",
    extensionsToTreatAsEsm: [".jsx"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    reporters: [
      "default",
      [
        "jest-html-reporters",
        {
          publicPath: "./html-report",
          filename: "report.html",
          expand: true
        }
      ]
    ]
  };
  