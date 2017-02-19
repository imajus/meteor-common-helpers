Package.describe({
  name: 'imajus:common-helpers',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Logical operations, logging, object manipulation Spacebars helpers.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/imajus/meteor-common-helpers.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null//'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2');
  api.use('ecmascript@0.6.3');
  api.use(['templating@1.3.0', 'underscore@1.0.10', 'imajus:helpers-core@0.0.1'], 'client');
  api.mainModule('common-helpers.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript@0.6.3');
  api.use('tinytest@1.0.12');
  api.use(['blaze@2.3.0', 'templating@1.3.0', 'imajus:common-helpers@0.0.1'], 'client');
  api.mainModule('common-helpers-tests.js', 'client');
});
