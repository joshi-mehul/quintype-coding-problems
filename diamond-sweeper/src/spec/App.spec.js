/* eslint-env mocha */

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import App from './../components/App'
import Hello from '../components/Game'
import Footer from './../components/layout/Footer'

describe('App component', () => {
  it('should render the container with a Hello and Footer components', () => {
    const renderer = TestUtils.createRenderer()
    renderer.render(<App />)
    const actual = renderer.getRenderOutput()
    const expected = (
      <div className='container'>
        <Hello />
        <hr />
        <Footer name='Juanmnl' />
      </div>
    )
    expect(actual).toEqualJSX(expected)
  })
})
