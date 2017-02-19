import { Blaze } from 'meteor/blaze';

export class TemplateTestCase {
  
  constructor(test, template) {
    this.test = test;
    this.template = template;
  }

  switch() {
    this.template = template;
    return this;
  }

  equal(data, expected) {
    this.test.equal(Blaze.toHTMLWithData(this.template, data || {}), expected);
    return this;
  }

}