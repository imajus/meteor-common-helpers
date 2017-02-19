import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';

import { TemplateTestCase } from './template-test-case.js';
import './common-helpers-tests.html';

Tinytest.add('majus:common-helpers - log', (test) => {
  let logResult;
  const oldLog = console.log;
  console.log = (...rest) => logResult = rest; 
  Blaze.toHTML(Template.testCommonHelpersLog);
  console.log = oldLog;
  test.equal(logResult, [1000, 'Hello', { name: 'World', end: '!' }]);
});

Tinytest.add('majus:common-helpers - field', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersField)
    .equal({ o: { a: 1 }, f: 'a' }, '1')
    .equal({ o: { b: 1 }, f: 'a' }, '')
    .equal({ o: { a: { ab: 1 } }, f: 'a.ab' }, '1');
});

Tinytest.add('majus:common-helpers - not', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersNot)
    .equal(null, 'true')
    .equal({ a: true }, '')
    .equal({ a: false }, 'true')
    .equal({ a: false }, 'true')
    .equal({ a: 'true' }, '')
    .equal({ a: 'false' }, '');
});

Tinytest.add('majus:common-helpers - eq', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersEq)
    .equal({}, 'true')
    .equal({ a: 1, b: 1, c: 1 }, 'true')
    .equal({ a: 1, b: 1, c: '1' }, 'true')
    .equal({ a: 1, b: 1, c: undefined }, '');
});

Tinytest.add('majus:common-helpers - is', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersIs)
    .equal({}, 'true')
    .equal({ a: 1, b: 1, c: 1 }, 'true')
    .equal({ a: 1, b: 1, c: '1' }, '')
    .equal({ a: 1, b: 1, c: undefined }, '');
});

Tinytest.add('majus:common-helpers - and', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersAnd)
    .equal({}, '')
    .equal({ a: 0, b: 0, c: 1 }, '0')
    .equal({ a: 1, b: 2, c: 3 }, '3')
    .equal({ a: 0, b: null, c: 'x' }, '0')
    .equal({ a: 0, b: 2, c: undefined }, '0');
});

Tinytest.add('majus:common-helpers - or', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersOr)
    .equal({}, '')
    .equal({ a: 0, b: 0, c: 1 }, '1')
    .equal({ a: 1, b: 2, c: 3 }, '1')
    .equal({ a: 0, b: null, c: 'x' }, 'x')
    .equal({ a: 0, b: 2, c: undefined }, '2');
});

Tinytest.add('majus:common-helpers - sum', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersSum)
    .equal({}, 'NaN')
    .equal({ a: 1, b: 2, c: 3 }, '6')
    .equal({ a: 1, b: '2', c: 3 }, '123')
    .equal({ a: 1, b: undefined, c: undefined }, 'NaN');
});

Tinytest.add('majus:common-helpers - positive', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersPositive)
    .equal({ a: 1, b: 2, c: 3 }, 'true')
    .equal({ a: 1, b: 2, c: '3' }, 'true')
    .equal({ a: 1, b: -2, c: 3 }, '')
    .equal({ a: 1, b: 2, c: 0 }, '')
    .equal({ a: 1, b: 2, c: 'aaa' }, '');
});

Tinytest.add('majus:common-helpers - negative', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersNegative)
    .equal({ a: -1, b: -2, c: -3 }, 'true')
    .equal({ a: -1, b: -2, c: '-3' }, 'true')
    .equal({ a: -1, b: 2, c: -3 }, '')
    .equal({ a: -1, b: -2, c: 0 }, '')
    .equal({ a: -1, b: -2, c: 'aaa' }, '');
});

Tinytest.add('majus:common-helpers - gt, gte, lt, lte', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersGtGteLtLte)
    .equal({ a: 10, b: 11, c: 12, comp: undefined }, '')
    .equal({ a: 10, b: 11, c: 12, comp: 'xxx' }, '')
    .equal({ a: 10, b: 11, c: 12, comp: 5 }, 'gtgte')
    .equal({ a: 10, b: 11, c: 12, comp: 10 }, 'gte')
    .equal({ a: 10, b: 11, c: 12, comp: 15 }, 'ltlte')
    .equal({ a: 10, b: 11, c: 12, comp: 12 }, 'lte');
});

Tinytest.add('majus:common-helpers - nullOrUndefined', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersNullOrUndefined)
    .equal({ a: null, b: undefined }, 'true')
    .equal({ a: null, b: undefined, c: null }, 'true')
    .equal({ a: null, b: false }, '')
    .equal({ a: null, b: 'null' }, '')
    .equal({ a: null, b: 0 }, '');
});

Tinytest.add('majus:common-helpers - when', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersWhen)
    .equal({ a: true, b: 'yes', d: 1, e: 1, f: 1 }, 'yesyes')
    .equal({ a: true, b: 'yes', c: 'no', d: 1, e: 1 }, 'yesno')
    .equal({ a: false, b: 'yes', c: 'no', d: 'yes', e: 'yes', f: 0 }, 'nono');
});

Tinytest.add('majus:common-helpers - chunk', (test) => {
  new TemplateTestCase(test, Template.testCommonHelpersChunk)
    .equal({ arr: [1,2,3] }, '')
    .equal({ arr: [1,2,3,4,5,6], size: 3 }, '[1,2,3][4,5,6]')
    .equal({ arr: [1,2,3,4,5,6], size: 2 }, '[1,2][3,4][5,6]')
    .equal({ arr: [1,2,3,4,5,6], size: 4 }, '[1,2,3,4][5,6]');
});