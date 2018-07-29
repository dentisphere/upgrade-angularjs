import 'angular';
import 'angular-mocks';
import './src/app';

let testsContext = require.context('./src', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
