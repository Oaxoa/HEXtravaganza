var test = require('tape');
var HEXtravaganza=require('../src/HEXtravaganza.js');

test('Library exists', function (t) {
	t.plan(1);
	t.equal(typeof HEXtravaganza, 'object');
});