Package.describe({
  name: 'imajus:common-helpers',
  version: '0.1.0',
  summary: 'Blaze helpers for comparison, logic and numeric operators, logging',
  git: 'https://github.com/imajus/meteor-common-helpers.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom(['2.0', '3.0']);
  api.use('ecmascript');
  api.use(['templating@1.3.4||1.4.4', 'underscore', 'imajus:helpers-core@0.1.0'], 'client');
  api.mainModule('common-helpers.js', 'client');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest']);
  api.use(['blaze', 'templating', 'imajus:common-helpers'], 'client');
  api.mainModule('common-helpers-tests.js', 'client');
});
