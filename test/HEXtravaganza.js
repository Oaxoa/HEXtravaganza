var test = require('tape');
var HEXtravaganza=require('../src/HEXtravaganza.js');

test('Library exists', function (t) {
	t.equal(typeof HEXtravaganza, 'object');
	t.end();
});
test('Check input format', function (t) {
	t.throws(() => HEXtravaganza.parse('3'), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse('Hello world'), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse('#zzz'), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse({}), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse([]), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(0), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(1), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(true), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(false), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(undefined), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(null), Error, 'Bad argument format');
	t.throws(() => HEXtravaganza.parse(NaN), Error, 'Bad argument format');
	t.end();
});
test('Color conversion', function (t) {
	t.equal(HEXtravaganza.parse('#3'), '#333');
	t.equal(HEXtravaganza.parse('#03'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#13'), 'rgba(51,51,51,0.06)');
	t.equal(HEXtravaganza.parse('#23'), 'rgba(51,51,51,0.13)');
	t.equal(HEXtravaganza.parse('#F3'), '#333');
	t.equal(HEXtravaganza.parse('#333'), '#333');
	t.equal(HEXtravaganza.parse('#0333'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#1333'), 'rgba(51,51,51,0.06)');
	t.equal(HEXtravaganza.parse('#2333'), 'rgba(51,51,51,0.13)');
	t.equal(HEXtravaganza.parse('#F333'), '#333');
	t.equal(HEXtravaganza.parse('#00333'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#01333'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#03333'), 'rgba(51,51,51,0.01)');
	t.equal(HEXtravaganza.parse('#06333'), 'rgba(51,51,51,0.02)');
	t.equal(HEXtravaganza.parse('#10333'), 'rgba(51,51,51,0.06)');
	t.equal(HEXtravaganza.parse('#80333'), 'rgba(51,51,51,0.5)');
	t.equal(HEXtravaganza.parse('#FF333'), '#333');
	t.equal(HEXtravaganza.parse('#333333'), '#333333');

	t.equal(HEXtravaganza.parse('#0333333'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#1333333'), 'rgba(51,51,51,0.06)');
	t.equal(HEXtravaganza.parse('#2333333'), 'rgba(51,51,51,0.13)');
	t.equal(HEXtravaganza.parse('#F333333'), '#333333');


	t.equal(HEXtravaganza.parse('#00333333'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#01333333'), 'rgba(51,51,51,0)');
	t.equal(HEXtravaganza.parse('#03333333'), 'rgba(51,51,51,0.01)');
	t.equal(HEXtravaganza.parse('#06333333'), 'rgba(51,51,51,0.02)');
	t.equal(HEXtravaganza.parse('#10333333'), 'rgba(51,51,51,0.06)');
	t.equal(HEXtravaganza.parse('#80333333'), 'rgba(51,51,51,0.5)');
	t.equal(HEXtravaganza.parse('#FF333333'), '#333333');
	t.end();
});