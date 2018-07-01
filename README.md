# Overview

Some general helpers for Meteor Blaze including comparison, logic and numeric operators, logging, objects manipulation.

# Installation

```sh
meteor add imajus:common-helpers
```

# Related packages

* [imajus:string-helpers](https://github.com/imajus/meteor-string-helpers)
* [imajus:html-helpers](https://github.com/imajus/meteor-html-helpers)
* [imajus:bootstrap-helpers](https://github.com/imajus/meteor-bootstrap-helpers)

# Contents

Package provides following global Blaze helpers:

* `log(...args)` – Just logs all argument passed to the browser console.
* `field(object, path)` – Extract a field from object by path (dot delimeters can be used):
```html
{{field targetObject fieldName}}
{{field user 'email.0.address'}}
```
* `not(val)` – Equivalent of `!val`.
* `eq(...args)` – Returns `true` only if all arguments passed are equal (tested using `==` operator). 
_Note:_ returns `false` if only one argument is passed.
* `is(...args)` – Returns `true` only if all arguments passed are identical (tested using `===` operator). 
_Note:_ returns `false` if only one argument is passed.
* `and(...args)` – Returns true-like value if all arguments passed are true-like, return false-like otherwise (for using in conditions). Strictly speaking, helper returns first false-like value found in arguments or the last argument if all are true-like:
```html
{{#if and currentUser someState somethingElse}}
  <div class="{{and someStringVariable 'replacement'}}">
{{/if}}
```
* `or(...args)` – Returns true-like value if any argument passed is true-like, return false-like if all arguments are false-like (for using in conditions). Strictly speaking, helper returns first true-like value found in arguments or the last argument if all are false-like:
```html
{{#if or currentUser isEmulator}}
  <div class="{{or someStringVariable 'fallback'}}">
{{/if}}
```
* `sum(...args)` – Sums all arguments passed using `+=` operator (can also be used for string concatenation, but for that better to use `concat` from [imajus:string-helpers](https://github.com/imajus/meteor-string-helpers)):
```html
<div>{{sum price fee tax}}</div>
```
* `positive(...args)` – Returns `true` only if all passed arguments are greater than zero, returns `false` otherwise.
```html
{{#if positive balance}}...{{/if}}
```
* `negative(...args)` – Returns `true` only if all passed arguments are less than zero, returns `false` otherwise.
```html
{{#if negative balance}}...{{/if}}
```
* `gt(...args, { comp })` – Returns `true` only if all passed arguments are greater than `comp`, returns `false` otherwise.
```html
{{#if gt 9 balance comp=price}}...{{/if}}
```
* `gt(...args, { comp })` – Returns `true` only if all passed arguments are greater than or equal to `comp`, returns `false` otherwise.
```html
{{#if gte 10 balance comp=price}}...{{/if}}
```
* `lt(...args, { comp })` – Returns `true` only if all passed arguments are less than `comp`, returns `false` otherwise.
```html
{{#if lt 100 price comp=balance}}...{{/if}}
```
* `lte(...args, { comp })` – Returns `true` only if all passed arguments are less than or equal to `comp`, returns `false` otherwise.
```html
{{#if lte 99 price comp=balance}}...{{/if}}
```
* `nullOrUndefined(...args)` – Returns `true` only if all passed arguments are `null` or `undefined`.
* `when(...)` - Analogue of ternary operator. Has two forms:
  1. `when(cond, yes, no)` - Returns `yes` value when `cond` is true-like, returns `no` value otherwise.
  1. `when(...conds, { yes, no })` - Returns `yes` value when all `conds` are true-like, returns `no` value if any of `conds` false-like. This form allows not to pass `yes` and/or `no` at all, in which case `undefined` will be used for missing value.
```html
<div class="{{when loaded 'loaded' 'loading'}}">
<div class="{{when loaded 'loaded'}}">
<div class="{{when loaded no='loading'}}">
<div class="{{when loaded ready subsReady yes='ready' no='loading'}}">
<div class="{{when loaded ready subsReady yes='ready'}}">
<div class="{{when loaded ready subsReady no='loading'}}">
```
* `chunk(array, size)` – Splits array into chunks of equal `size` and return array of arrays. The latest `chunk` may have less elements than previous depending on the length of original array.
```html
{{#each group in chunk items 3}}
  <div class="row">
    {{#each item in group}}
      <div class="col">...</div>
    {{/each}}
  </div>
{{/each}}
```