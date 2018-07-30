import './src/app';

let testsContext = require.context('./src', true, /\.spec\.[jt]s$/);
testsContext.keys().forEach(testsContext);
