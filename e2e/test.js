/* eslint-env node, mocha */
/* global browser */

const assert = require('assert')

describe('hb-week4-js-dom', () => {
  it('should have the right title', () => {
    browser.url('/')
    const title = browser.getTitle()
    assert.equal(title, 'hb-week4-js-dom')
  })
})
